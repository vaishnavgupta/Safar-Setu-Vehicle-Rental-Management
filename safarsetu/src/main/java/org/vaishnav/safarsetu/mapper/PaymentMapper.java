package org.vaishnav.safarsetu.mapper;

import org.springframework.stereotype.Component;
import org.vaishnav.safarsetu.models.Payment;
import org.vaishnav.safarsetu.payload.dto.PaymentDto;

@Component
public class PaymentMapper {

    public PaymentDto paymentToDto(Payment payment) {
        if(payment==null){
            return null;
        }

        PaymentDto dto = PaymentDto.builder()
                .id(payment.getId())
                .userId(payment.getUser().getId())
                .userName(payment.getUser().getFullName())
                .userEmail(payment.getUser().getEmail())
                .paymentType(payment.getPaymentType())
                .paymentGateway(payment.getPaymentGateway())
                .paymentStatus(payment.getPaymentStatus())
                .amount(payment.getAmount())
                .transactionId(payment.getTransactionId())
                .gatewayPaymentId(payment.getPaymentGatewayId())
                .gatewayOrderId(payment.getGatewayOrderId())
                .gatewaySignature(payment.getGatewaySignature())
                .description(payment.getDescription())
                .failureReason(payment.getFailureReason())
                .initiatedAt(payment.getInitiatedAt())
                .completedAt(payment.getCompletedAt())
                .active( true )
                .createdAt( payment.getCreatedAt() )
                .updatedAt( payment.getUpdatedAt() )
                .build();

        if (payment.getSubscription() != null) {
            dto.setSubscriptionId(payment.getSubscription().getId());
        }
        return dto;
    }

}
