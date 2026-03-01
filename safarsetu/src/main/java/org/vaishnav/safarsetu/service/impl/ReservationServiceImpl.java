package org.vaishnav.safarsetu.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.vaishnav.safarsetu.config.AppConstants;
import org.vaishnav.safarsetu.domain.RentalStatus;
import org.vaishnav.safarsetu.domain.ReservationStatus;
import org.vaishnav.safarsetu.exception.UserException;
import org.vaishnav.safarsetu.mapper.ReservationMapper;
import org.vaishnav.safarsetu.models.Reservation;
import org.vaishnav.safarsetu.models.User;
import org.vaishnav.safarsetu.models.Vehicle;
import org.vaishnav.safarsetu.payload.dto.ReservationDto;
import org.vaishnav.safarsetu.payload.request.CheckoutRequest;
import org.vaishnav.safarsetu.payload.request.ReservationRequest;
import org.vaishnav.safarsetu.payload.request.ReservationSearchRequest;
import org.vaishnav.safarsetu.payload.response.PageResponse;
import org.vaishnav.safarsetu.repository.ReservationRepository;
import org.vaishnav.safarsetu.repository.UserRepository;
import org.vaishnav.safarsetu.repository.VehicleRentalsRepository;
import org.vaishnav.safarsetu.repository.VehicleRepository;
import org.vaishnav.safarsetu.service.ReservationService;
import org.vaishnav.safarsetu.service.UserService;
import org.vaishnav.safarsetu.service.VehicleRentalsService;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {
    private final ReservationRepository reservationRepository;
    private final VehicleRentalsRepository  vehicleRentalsRepository;
    private final UserRepository userRepository;
    private final VehicleRepository vehicleRepository;
    private final ReservationMapper reservationMapper;
    private final UserService userService;
    private final VehicleRentalsService vehicleRentalsService;

    @Override
    public ReservationDto createReservation(ReservationRequest request) throws Exception {
        User currUser = userService.getCurrentUser();
        return createReservationForUser(request, currUser.getId());
    }

    @Override
    public ReservationDto createReservationForUser(ReservationRequest request, Long userId) throws Exception {
        // 1. Already have an active VehicleRental
        boolean alreadyHaveRentals = vehicleRentalsRepository.existsByUserIdAndVehicleIdAndStatus(
                userId, request.getVehicleId(), RentalStatus.ACTIVE
        );

        if(alreadyHaveRentals) {
            throw new Exception("User with id " + userId + " already have existing Vehicle Rental");
        }

        // 2. Validate User exists or not
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserException("User with id " + userId + " not found"));

        // 3. Validate Vehicle Exists or not
        Vehicle vehicle = vehicleRepository.findById(request.getVehicleId())
                .orElseThrow(() -> new Exception("Vehicle with id " + request.getVehicleId() + " not found"));

        // 4. User have active reservation or not
        if( reservationRepository.hasActiveReservation(user.getId(), vehicle.getId()) ) {
            throw new Exception("User with id " + userId + " already have ongoing reservation on vehicle with id " + vehicle.getId());
        }

        // 5. Check Vehicle is already available
        if( vehicle.getAvailableUnits() > 0 ) {
            throw new Exception("Vehicle with id " + vehicle.getId() + " is already available.\nNo, reservations can be made");
        }

        // 6. Check User's Active Reservation Limit
        long activeReservation = reservationRepository.countActiveReservationsByUserId(user.getId());
        if(activeReservation >= AppConstants.MAX_ACTIVE_RESERVATION) {
            throw new Exception("Maximum Reservation reached for user with id " + userId);
        }

        // 7. Saving the Reservation
        Reservation reservation = new Reservation();
        reservation.setUser(user);
        reservation.setVehicle(vehicle);
        reservation.setStatus(ReservationStatus.PENDING);
        reservation.setReservedAt(LocalDateTime.now());
        reservation.setNotes(request.getNotes());
        reservation.setNotificationSent(false);

        long pendingReservations = reservationRepository.countPendingReservationsByVehicle(vehicle.getId());
        reservation.setQueuePosition((int)pendingReservations + 1);

        Reservation savedReservation = reservationRepository.save(reservation);

        return reservationMapper.reservationToDto(savedReservation);
    }

    @Override
    public ReservationDto cancelReservation(Long reservationId) throws Exception {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new Exception("Reservation does not exists with id " + reservationId));

        User user = userService.getCurrentUser();

        if( !reservation.getUser().getId().equals(user.getId()) ) {
            throw new Exception("User can cancel only own Reservations");
        }

        if ( !reservation.canBeCancelled() ) {
            throw new Exception("Reservation can not be cancelled");
        }

        reservation.setStatus(ReservationStatus.CANCELLED);
        reservation.setCancelledAt(LocalDateTime.now());
        reservation.setNotes(reservation.getNotes() + "\nCancelled Reservation by user.");

        Reservation savedReservation = reservationRepository.save(reservation);

        return reservationMapper.reservationToDto(savedReservation);
    }

    @Override
    public ReservationDto fulfillReservation(Long reservationId) throws Exception {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new Exception("Reservation does not exists with id " + reservationId));

        if(reservation.getVehicle().getAvailableUnits() <= 0) {
            throw new Exception("Vehicle with id " + reservation.getVehicle().getId() + " has no available units");
        }

        reservation.setStatus(ReservationStatus.FULFILLED);
        reservation.setFulfilledAt(LocalDateTime.now());

        Reservation savedReservation = reservationRepository.save(reservation);

        CheckoutRequest checkoutRequest = new CheckoutRequest();
        checkoutRequest.setVehicleId(reservation.getVehicle().getId());
        checkoutRequest.setNotes("Booked by Reservation from Admin with ReservationId: " + reservation.getId());

        vehicleRentalsService.checkoutVehicleForUser(savedReservation.getUser().getId(), checkoutRequest);

        return reservationMapper.reservationToDto(savedReservation);
    }

    @Override
    public PageResponse<ReservationDto> getMyReservations(ReservationSearchRequest request) throws UserException {
        User currUser = userService.getCurrentUser();
        request.setUserId(currUser.getId());
        return searchReservations(request);
    }

    @Override
    public PageResponse<ReservationDto> searchReservations(ReservationSearchRequest request) {
        Pageable pageable = createPageable(request);

        Page<Reservation> reservations = reservationRepository.searchReservationsWithFilters(
            request.getUserId(),
                request.getVehicleId(),
                request.getStatus(),
                request.isActive0nly() ,
                pageable
        );

        return buildPageResponse(reservations);
    }

    private PageResponse<ReservationDto> buildPageResponse(Page<Reservation> reservations) {
        List<ReservationDto> dtoList = reservations.getContent()
                .stream()
                .map(reservation -> reservationMapper.reservationToDto(reservation))
                .toList();

        PageResponse<ReservationDto> pageResponse = new PageResponse<>();
        pageResponse.setContent(dtoList);
        pageResponse.setTotalElements(reservations.getTotalElements());
        pageResponse.setTotalPages(reservations.getTotalPages());
        pageResponse.setPageNumber(reservations.getNumber());
        pageResponse.setPageSize(reservations.getSize());
        pageResponse.setPageSize(reservations.getSize());
        pageResponse.setEmpty(reservations.isEmpty());
        pageResponse.setFirst(reservations.isFirst());
        pageResponse.setLast(reservations.isLast());
        
        return pageResponse;
    }

    private Pageable createPageable(ReservationSearchRequest request) {
        Sort sort = "ASC".equalsIgnoreCase(request.getSortDirection())
                ? Sort.by(request.getSortBy()).ascending()
                : Sort.by(request.getSortBy()).descending();
        return PageRequest.of(request.getPage(), request.getSize(), sort);
    }
}
