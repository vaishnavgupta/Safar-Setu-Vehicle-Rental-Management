package org.vaishnav.safarsetu.payload.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.vaishnav.safarsetu.domain.PaymentGateway;
import org.vaishnav.safarsetu.domain.PaymentStatus;
import org.vaishnav.safarsetu.domain.PaymentType;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentDto {

    private Long id;

    @NotNull(message = "User Id is required")
    private Long userId;

    private String userName;

    private String userEmail;

    private Long subscriptionId;

    @NotNull(message = "Payment Type is required")
    private PaymentType paymentType;

    private PaymentStatus paymentStatus;

    private PaymentGateway paymentGateway;

    @NotNull(message = "Payment Amount is required for Payment")
    @Positive(message = "Payment Amount must be positive")
    private Long amount;

    private String transactionId;

    private String gatewayPaymentId;

    private String gatewayOrderId;

    private String gatewaySignature;

    private String description;

    private String failureReason;

    private Integer retryCount;

    private LocalDateTime initiatedAt;

    private LocalDateTime completedAt;

    private boolean active;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
