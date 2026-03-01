package org.vaishnav.safarsetu.service.impl;

import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.vaishnav.safarsetu.domain.PaymentGateway;
import org.vaishnav.safarsetu.domain.PaymentStatus;
import org.vaishnav.safarsetu.event.publisher.PaymentEventPublisher;
import org.vaishnav.safarsetu.exception.UserException;
import org.vaishnav.safarsetu.mapper.PaymentMapper;
import org.vaishnav.safarsetu.models.Payment;
import org.vaishnav.safarsetu.models.Subscription;
import org.vaishnav.safarsetu.models.User;
import org.vaishnav.safarsetu.payload.dto.PaymentDto;
import org.vaishnav.safarsetu.payload.request.PaymentInitiateRequest;
import org.vaishnav.safarsetu.payload.request.PaymentVerifyRequest;
import org.vaishnav.safarsetu.payload.response.PaymentInitiateResponse;
import org.vaishnav.safarsetu.payload.response.PaymentLinkResponse;
import org.vaishnav.safarsetu.repository.PaymentRepository;
import org.vaishnav.safarsetu.repository.SubscriptionRepository;
import org.vaishnav.safarsetu.repository.UserRepository;
import org.vaishnav.safarsetu.service.PaymentService;
import org.vaishnav.safarsetu.service.gateway.RazorpayService;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
    private final PaymentRepository paymentRepository;
    private final UserRepository  userRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final RazorpayService razorpayService;
    private final PaymentMapper paymentMapper;
    private final PaymentEventPublisher paymentEventPublisher;

    @Override
    public PaymentInitiateResponse initiatePayment(PaymentInitiateRequest request) throws UserException {
        User user = userRepository.findById( request.getUserId() )
                .orElseThrow( () -> new UserException("User does not exists with id: " + request.getUserId()) );
        Payment payment = new Payment();

        payment.setUser(user);
        payment.setPaymentType(request.getPaymentType());
        payment.setPaymentGateway(request.getPaymentGateway());
        payment.setAmount(request.getAmount());
        payment.setDescription(request.getDescription());
        payment.setPaymentStatus(PaymentStatus.PENDING);
        payment.setTransactionId("TXN_" + UUID.randomUUID());
        payment.setInitiatedAt( LocalDateTime.now() );

        //Setting subscription
        if( request.getSubscriptionId() != null ) {
            Subscription subscription = subscriptionRepository.findById( request.getSubscriptionId() )
                    .orElseThrow( () -> new RuntimeException("Subscription does not exists with id: " + request.getSubscriptionId()) );
            payment.setSubscription(subscription);
        }
        payment =  paymentRepository.save( payment );

        PaymentInitiateResponse response = new PaymentInitiateResponse();

        if( request.getPaymentGateway() == PaymentGateway.RAZORPAY ) {
            PaymentLinkResponse paymentLinkResponse = razorpayService.createPaymentLink(
                    payment.getUser(),
                    payment
            );
            response = PaymentInitiateResponse.builder()
                    .paymentGateway(PaymentGateway.RAZORPAY)
                    .paymentId(payment.getId())
                    .checkoutUrl( paymentLinkResponse.getShort_url() )
                    .transactionId(payment.getTransactionId() )
                    .amount( payment.getAmount() )
                    .description( payment.getDescription() )
                    .razorpayOrderId( paymentLinkResponse.getUrl_id() )     // url_id == razorpay_order_id
                    .success( true )
                    .message( "Payment Initiated Successfully" )
                    .build();

            payment.setGatewayOrderId( paymentLinkResponse.getUrl_id() );
            payment.setGatewaySignature("SIGN_RAZORPAY");                   //TODO
        }
        payment.setPaymentStatus(PaymentStatus.PROCESSING);
        paymentRepository.save( payment );
        // TODO - Publish Payment Initiate Event
        return response;
    }

    @Override
    public PaymentDto verifyPayment(PaymentVerifyRequest request) throws Exception {
        JSONObject paymentsJson = razorpayService.fetchPaymentDetails(request.getRazorpayPaymentId());

        JSONObject notes = paymentsJson.getJSONObject("notes");
        Long paymentId = Long.parseLong(notes.optString("payment_id"));

        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow( () -> new RuntimeException("Payment(Verify Payment) does not exists with id: " + paymentId) );

        boolean isValid = razorpayService.isValidPayment(request.getRazorpayPaymentId());

        if( PaymentGateway.RAZORPAY == payment.getPaymentGateway() ) {
            if(isValid) {
                payment.setGatewayOrderId( payment.getGatewayOrderId() );
            }
        }

        if( isValid ) {
            payment.setPaymentStatus(PaymentStatus.SUCCESS);
            payment.setCompletedAt(LocalDateTime.now());
            payment = paymentRepository.save( payment );

            paymentEventPublisher.publishPaymentSuccessEvent(payment);
        }

        return paymentMapper.paymentToDto(payment);
    }

    @Override
    public Page<PaymentDto> getAllPayments(Pageable pageable) {
        Page<Payment> payments = paymentRepository.findAll(pageable);
        return payments.map(paymentMapper::paymentToDto);
    }
}
