package org.vaishnav.safarsetu.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.vaishnav.safarsetu.exception.UserException;
import org.vaishnav.safarsetu.payload.dto.PaymentDto;
import org.vaishnav.safarsetu.payload.request.PaymentInitiateRequest;
import org.vaishnav.safarsetu.payload.request.PaymentVerifyRequest;
import org.vaishnav.safarsetu.payload.response.PaymentInitiateResponse;

public interface PaymentService {

    PaymentInitiateResponse initiatePayment(PaymentInitiateRequest request) throws UserException;

    PaymentDto verifyPayment(PaymentVerifyRequest request ) throws Exception;

    Page<PaymentDto> getAllPayments(Pageable pageable);

}
