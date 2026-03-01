package org.vaishnav.safarsetu.service;

import org.vaishnav.safarsetu.domain.FineStatus;
import org.vaishnav.safarsetu.domain.FineType;
import org.vaishnav.safarsetu.exception.UserException;
import org.vaishnav.safarsetu.payload.dto.FineDto;
import org.vaishnav.safarsetu.payload.request.CreateFineRequest;
import org.vaishnav.safarsetu.payload.request.WaiveFineRequest;
import org.vaishnav.safarsetu.payload.response.PageResponse;
import org.vaishnav.safarsetu.payload.response.PaymentInitiateResponse;

import java.util.List;

public interface FineService {

    FineDto createFine(CreateFineRequest request) throws Exception;

    PaymentInitiateResponse payFine(Long fineId, String transactionId) throws Exception;

    void markFineAsPaid(Long fineId, Long amount, String transactionId) throws Exception;

    FineDto waiveFine(WaiveFineRequest request) throws Exception;

    List<FineDto> getMyFines(FineStatus status, FineType type) throws UserException;

    PageResponse<FineDto> getAllFines(
            FineStatus status,
            FineType type,
            Long userId,
            int page,
            int size
    );
}
