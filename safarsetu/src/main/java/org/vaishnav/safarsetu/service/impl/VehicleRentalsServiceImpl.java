package org.vaishnav.safarsetu.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.vaishnav.safarsetu.domain.RentalStatus;
import org.vaishnav.safarsetu.domain.RentalType;
import org.vaishnav.safarsetu.exception.UserException;
import org.vaishnav.safarsetu.exception.VehicleException;
import org.vaishnav.safarsetu.mapper.VehicleRentalsMapper;
import org.vaishnav.safarsetu.models.User;
import org.vaishnav.safarsetu.models.Vehicle;
import org.vaishnav.safarsetu.models.VehicleRentals;
import org.vaishnav.safarsetu.payload.dto.SubscriptionDto;
import org.vaishnav.safarsetu.payload.dto.VehicleRentalsDto;
import org.vaishnav.safarsetu.payload.request.CheckinRequest;
import org.vaishnav.safarsetu.payload.request.CheckoutRequest;
import org.vaishnav.safarsetu.payload.request.RenewalRequest;
import org.vaishnav.safarsetu.payload.request.VehicleRentalSearchRequest;
import org.vaishnav.safarsetu.payload.response.PageResponse;
import org.vaishnav.safarsetu.repository.VehicleRentalsRepository;
import org.vaishnav.safarsetu.repository.VehicleRepository;
import org.vaishnav.safarsetu.service.SubscriptionService;
import org.vaishnav.safarsetu.service.UserService;
import org.vaishnav.safarsetu.service.VehicleRentalsService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VehicleRentalsServiceImpl implements VehicleRentalsService {

    private final VehicleRentalsRepository rentalsRepository;
    private final UserService userService;
    private final SubscriptionService  subscriptionService;
    private final VehicleRepository vehicleRepository;
    private final VehicleRentalsMapper  vehicleRentalsMapper;

    @Override
    public VehicleRentalsDto checkoutVehicle(CheckoutRequest request) throws Exception {
        User user = userService.getCurrentUser();
        return checkoutVehicleForUser(user.getId(), request);
    }

    @Override
    public VehicleRentalsDto checkoutVehicleForUser(Long userId, CheckoutRequest request) throws Exception {
        // 1. Find User
        User user = userService.findByUserId(userId);

        // 2. Check weather user has active subscription or not
        SubscriptionDto subscription = subscriptionService
                .getUserActiveSubscriptions(user.getId());

        // 3. Checking Vehicle Availability or Not
        Vehicle vehicle = vehicleRepository.findById( request.getVehicleId() )
                .orElseThrow( () -> new VehicleException("Invalid Vehicle Id. Vehicle does not exists!"));

        if (!vehicle.getActive()) {
            throw new VehicleException("Vehicle is not active.");
        }
        if(vehicle.getAvailableUnits() <= 0) {
            throw new VehicleException("Vehicle is not available now.");
        }

        // 4. User already have Rental for this book
        if( rentalsRepository.hasActiveCheckout(user.getId(), vehicle.getId()) ){
            throw new Exception("User already have active rental on this vehicle. Clear previous rentals.");
        }

        // 5. Check the Checkout Limit (Max Vehicles Allowed in Subscription)
        long activeCheckoutVehicle = rentalsRepository.countActiveRentalsByUserId(user.getId());



        if(activeCheckoutVehicle >= subscription.getMaxVehiclesAllowed()) {
            throw new Exception("Maximum Number of Vehicles are already active.");
        }

        // 6. If OVERDUE Vehicle => No NEW Vehicle will be give
        long overdueCount = rentalsRepository.countOverdueRentalsByUserId(user.getId());
        if(overdueCount > 0){
            throw new Exception("Clear Overdue Rentals to get new Rentals.");
        }

        // 7. Check Unpaid Fines (if any)
        // TODO

        // 8. Create Rentals Entity
        VehicleRentals rentals = VehicleRentals.builder()
                .user(user)
                .vehicle(vehicle)
                .type(RentalType.DAILY)
                .status(RentalStatus.ACTIVE)
                .checkoutDate(LocalDateTime.now())
                .dueDate( LocalDateTime.now().plusDays(request.getReturnDays()) )
                .returnDate( null )
                .extensionCount(0)
                .maxExtensions(2)
                .notes(request.getNotes())
                .isOverdue(false)
                .overdueDays(0)
                .build();

        // 9. Update Available Vehicles Count
        int cnt = vehicle.getAvailableUnits();
        vehicle.setAvailableUnits(cnt - 1);
        vehicleRepository.save(vehicle);

        // 10. Saving Vehicle Rental
        VehicleRentals savedRental = rentalsRepository.save(rentals);

        // 11. Return VehicleRentalDto by Mapper
        return vehicleRentalsMapper.rentalToDto(savedRental);
    }

    @Override
    public VehicleRentalsDto checkinVehicle(CheckinRequest request) throws Exception {
        // 1. Validate VehicleRental exists
        VehicleRentals rentals = rentalsRepository.findById(request.getVehicleRentalId())
                .orElseThrow( () -> new VehicleException("Vehicle Rentals does not exists.") );

        // 2. Check if already exists
        if( !rentals.isActive() ) {
            throw new Exception("Vehicle Rental is already cleared");
        }

        // 3. Set Return Date
        rentals.setReturnDate(LocalDateTime.now());

        // 4. Change VehicleStatus Condition
        RentalStatus condition = request.getCondition();

        if( condition == null ) {
            condition =  RentalStatus.RETURNED;
        }
        rentals.setStatus(condition);

        // 5. Fine Calculation - TODO
        rentals.setOverdue(false);
        rentals.setOverdueDays(0);

        // 6. Set Notes
        rentals.setNotes("Vehicle Returned.\n" + request.getNotes());

        // 7. Update Vehicle Availability
        if( condition != RentalStatus.LOST ) {
            Vehicle vehicle = rentals.getVehicle();
            vehicle.setAvailableUnits( vehicle.getAvailableUnits() + 1 );
            vehicleRepository.save(vehicle);

            // Process next Reservation - TODO
        }

        // 8. Return VehicleRentalDto
        VehicleRentals savedRental = rentalsRepository.save(rentals);
        return vehicleRentalsMapper.rentalToDto(savedRental);
    }

    @Override
    public VehicleRentalsDto renewCheckout(RenewalRequest request) throws Exception {
        VehicleRentals rentals = rentalsRepository.findById(request.getVehicleRentalId())
                .orElseThrow(() -> new Exception("Vehicle Rentals does not exists."));

        if( !rentals.canRenewExtension() ) {
            throw new Exception("Vehicle Rental cannot renew extension");
        }

        rentals.setDueDate(rentals.getDueDate().plusDays(request.getExtensionDays()));

        rentals.setExtensionCount( rentals.getExtensionCount() + 1 );

        rentals.setNotes("Vehicle Rental extended by the user.");

        VehicleRentals savedRentals = rentalsRepository.save(rentals);

        return vehicleRentalsMapper.rentalToDto(savedRentals);
    }

    @Override
    public PageResponse<VehicleRentalsDto> getMyVehicleRentals(RentalStatus status, int page, int size) throws UserException {
        User user = userService.getCurrentUser();
        Page<VehicleRentals> rentalsPage;

        if( status != null ) {
            Pageable pageable = createPageable(page, size, "dueDate", "ASC");
            rentalsPage = rentalsRepository.findByStatusAndUser(status, user, pageable);
        }
        else {
            Pageable pageable = createPageable(page, size, "createdAt", "ASC");
            rentalsPage = rentalsRepository.findByUserId(user.getId(), pageable);
        }

        return convertToPageResponse(rentalsPage);
    }

    @Override
    public PageResponse<VehicleRentalsDto> getAllVehicleRentals(VehicleRentalSearchRequest request) {
        Pageable pageable = createPageable(
                request.getPage(),  request.getSize(), request.getSortBy(), request.getSortDirection()
        );

        Page<VehicleRentals> rentalsPage ;

        if (request.getOverdueOnly() == true) {
            rentalsPage = rentalsRepository.getOverdueRentals(LocalDateTime.now(), pageable);
        }
        else if (request.getUserId() != null) {
            rentalsPage = rentalsRepository.findByUserId(request.getUserId(), pageable);
        }
        else if (request.getVehicleId() != null) {
            rentalsPage = rentalsRepository.findByVehicleId(request.getVehicleId(), pageable);
        }
        else if (request.getStatus() != null) {
            rentalsPage = rentalsRepository.findByStatus(request.getStatus(), pageable);
        }
        else if(request.getStartDate() != null && request.getEndDate() != null) {
            rentalsPage = rentalsRepository.findVehicleRentalsByDateRange(
                    request.getStartDate(),
                    request.getEndDate(),
                    pageable
            );
        }
        else rentalsPage = rentalsRepository.findAll(pageable);

        return convertToPageResponse(rentalsPage);
    }

    @Override
    public int updateOverdueVehicleRentals() {
        Pageable pageable = PageRequest.of(0, 1000);
        Page<VehicleRentals> rentalsPage = rentalsRepository.getOverdueRentals(LocalDateTime.now(), pageable);

        int updateCount = 0;
        for (VehicleRentals rentals : rentalsPage.getContent()) {
            if ( rentals.getStatus() == RentalStatus.ACTIVE ) {
                rentals.setStatus(RentalStatus.OVERDUE);
                rentals.setOverdue(true);
                rentals.setOverdueDays(calculateOverdueDays(rentals.getDueDate().toLocalDate(), LocalDate.now()));
                // TODO - Calculate Fine
                rentalsRepository.save(rentals);
                updateCount++;
            }
        }
        return updateCount;
    }

    // Private Methods

    private Pageable createPageable(int page, int size, String sortBy, String sortDirection) {
        size = Math.min(size, 100);
        page = Math.min(page, size);

        Sort sort = sortDirection.equalsIgnoreCase("ASC")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        return PageRequest.of(page, size, sort);
    }

    private PageResponse<VehicleRentalsDto> convertToPageResponse( Page<VehicleRentals> vehicleRentalsPage ){
        List<VehicleRentalsDto> dtoList = vehicleRentalsPage.getContent()
                .stream()
                .map(rental -> vehicleRentalsMapper.rentalToDto(rental))
                .toList();

        return new PageResponse<>(
                dtoList,
                vehicleRentalsPage.getNumber(),
                vehicleRentalsPage.getSize(),
                vehicleRentalsPage.getTotalElements(),
                vehicleRentalsPage.getTotalPages(),
                vehicleRentalsPage.isLast(),
                vehicleRentalsPage.isFirst(),
                vehicleRentalsPage.isEmpty()
        );
    }

    private int calculateOverdueDays(LocalDate dueDate, LocalDate todayDate) {
        if( todayDate.isBefore(dueDate) || todayDate.isEqual(dueDate) ) return 0;
        return (int) ChronoUnit.DAYS.between(dueDate, todayDate);
    }
}
