package org.vaishnav.safarsetu.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.vaishnav.safarsetu.domain.FineStatus;
import org.vaishnav.safarsetu.domain.FineType;
import org.vaishnav.safarsetu.domain.PaymentGateway;
import org.vaishnav.safarsetu.domain.PaymentType;
import org.vaishnav.safarsetu.exception.UserException;
import org.vaishnav.safarsetu.mapper.FineMapper;
import org.vaishnav.safarsetu.models.Fine;
import org.vaishnav.safarsetu.models.User;
import org.vaishnav.safarsetu.models.VehicleRentals;
import org.vaishnav.safarsetu.payload.dto.FineDto;
import org.vaishnav.safarsetu.payload.request.CreateFineRequest;
import org.vaishnav.safarsetu.payload.request.PaymentInitiateRequest;
import org.vaishnav.safarsetu.payload.request.WaiveFineRequest;
import org.vaishnav.safarsetu.payload.response.PageResponse;
import org.vaishnav.safarsetu.payload.response.PaymentInitiateResponse;
import org.vaishnav.safarsetu.repository.FineRepository;
import org.vaishnav.safarsetu.repository.VehicleRentalsRepository;
import org.vaishnav.safarsetu.service.FineService;
import org.vaishnav.safarsetu.service.PaymentService;
import org.vaishnav.safarsetu.service.UserService;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FineServiceImpl implements FineService {
    private final FineRepository fineRepository;
    private final VehicleRentalsRepository vehicleRentalsRepository;
    private final FineMapper fineMapper;
    private final UserService  userService;
    private final PaymentService paymentService;

    @Override
    public FineDto createFine(CreateFineRequest request) throws Exception {
        // 1. Validate Vehicle Rental Exists
        VehicleRentals rentals = vehicleRentalsRepository.findById(request.getVehicleRentalsId())
                .orElseThrow(() -> new Exception("Vehicle Rentals not found"));
        // 2. Create Fine
        Fine fine = new Fine();
        fine.setUser(rentals.getUser());
        fine.setVehicleRentals(rentals);
        fine.setFineType(request.getType());
        fine.setAmount(request.getAmount());
        fine.setFineStatus(FineStatus.PENDING);
        fine.setReason(request.getReason());
        fine.setNote(request.getNotes());

        fine = fineRepository.save(fine);

        // 3. Fine Mapper
        return fineMapper.fineToDto(fine);
    }

    @Override
    public PaymentInitiateResponse payFine(Long fineId, String transactionId) throws Exception {
        // 1. Validate Fine Exists
        Fine fine = fineRepository.findById(fineId)
                .orElseThrow(() -> new Exception("Fine not found with id: " + fineId));

        // 2. Check already paid or not
        if( fine.getFineStatus().equals(FineStatus.PAID) ) {
            throw new Exception("Fine is already paid");
        }
        if (fine.getFineStatus().equals(FineStatus.WAIVED)) {
            throw new Exception("Fine is already waived by: " + fine.getWaivedBy().getFullName());
        }

        // 3. Initiate Fine Payment
        User currUser = userService.getCurrentUser();
        PaymentInitiateRequest request = PaymentInitiateRequest.builder()
                .userId(currUser.getId())
                .fineId(fine.getId())
                .paymentType(PaymentType.FINE)
                .paymentGateway(PaymentGateway.RAZORPAY)
                .amount(fine.getAmount())
                .description("Fine Payment: " + fine.getNote())
                .build();

        return paymentService.initiatePayment(request);
    }

    @Override
    public void markFineAsPaid(Long fineId, Long amount, String transactionId) throws Exception {
        Fine fine = fineRepository.findById(fineId)
                .orElseThrow(() -> new Exception("Fine not found with id: " + fineId));

        // Setting paid Amount
        fine.applyAmount(amount);
        fine.setTransactionId(transactionId);
        fine.setFineStatus(FineStatus.PAID);
        fineRepository.save(fine);
    }

    @Override
    public FineDto waiveFine(WaiveFineRequest request) throws Exception {
        // 1. Validating if Fine exists or not
        Fine fine = fineRepository.findById(request.getFineId())
                .orElseThrow(() -> new Exception("Fine not found with id: " + request.getFineId()));

        // 2. Checking status if PAID or WAIVED already
        if( fine.getFineStatus().equals(FineStatus.PAID) ) {
            throw new Exception("Fine is already paid and cannot be refunded");
        }
        if (fine.getFineStatus().equals(FineStatus.WAIVED)) {
            throw new Exception("Fine is already waived by: " + fine.getWaivedBy().getFullName());
        }

        // 4. Getting Current User (Must be used in AdminController)
        User currUser = userService.getCurrentUser();

        // 3. Otherwise, waive the fine
        fine.setFineStatus(FineStatus.WAIVED);
        fine.setWaiverReason(request.getReason());
        fine.setWaivedBy(currUser);
        fine.setWaivedAt(LocalDateTime.now());

        fine = fineRepository.save(fine);

        return fineMapper.fineToDto(fine);
    }

    @Override
    public List<FineDto> getMyFines(FineStatus status, FineType type) throws UserException {
        User currUser = userService.getCurrentUser();
        List<Fine> fines;

        // Apply filters based on parameters
        if(status != null && type != null) {
            fines = fineRepository.findByUserId(currUser.getId())
                    .stream()
                    .filter(fine -> (fine.getFineStatus() == status && fine.getFineType() == type) )
                    .toList();
        }
        else if( status != null ) {
            fines = fineRepository.findByUserId(currUser.getId())
                    .stream()
                    .filter(fine -> fine.getFineStatus() == status)
                    .toList();
        }
        else if( type != null ) {
            fines = fineRepository.findByUserId(currUser.getId())
                    .stream()
                    .filter(fine -> fine.getFineType() == type)
                    .toList();
        }
        else fines = fineRepository.findByUserId(currUser.getId());

        return fines.stream().map(fineMapper::fineToDto).toList();
    }

    @Override
    public PageResponse<FineDto> getAllFines(FineStatus status, FineType type, Long userId, int page, int size) {
        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by("createdAt").descending()
        );

        Page<Fine> finePage = fineRepository.findAllWithFilters(userId, status, type, pageable);

        List<FineDto> dtoList = finePage.getContent()
                .stream().map(fineMapper::fineToDto).toList();

        PageResponse<FineDto> pageResponse = new PageResponse<>();
        pageResponse.setContent(dtoList);
        pageResponse.setPageNumber(finePage.getNumber());
        pageResponse.setPageSize(finePage.getSize());
        pageResponse.setTotalElements(finePage.getTotalElements());
        pageResponse.setTotalPages(finePage.getTotalPages());
        pageResponse.setLast(finePage.isLast());
        pageResponse.setFirst(finePage.isFirst());
        pageResponse.setEmpty(finePage.isEmpty());

        return pageResponse;
    }
}
