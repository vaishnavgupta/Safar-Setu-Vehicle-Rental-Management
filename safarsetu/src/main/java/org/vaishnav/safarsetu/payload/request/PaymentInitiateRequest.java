package org.vaishnav.safarsetu.payload.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.vaishnav.safarsetu.domain.PaymentGateway;
import org.vaishnav.safarsetu.domain.PaymentType;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentInitiateRequest {
    @NotNull(message = "UserId is required for Payment")
    private Long userId;

    private Long vehicleRentalId;

    @NotNull(message = "Payment Type is required for Payment")
    private PaymentType paymentType;

    @NotNull(message = "Payment Gateway is required for Payment")
    private PaymentGateway paymentGateway;

    @NotNull(message = "Payment Amount is required for Payment")
    @Positive(message = "Payment Amount must be positive")
    private Long amount;

    @Size(max = 500, message = "Description can have max of 500 characters")
    private String description;

    @Size(max = 500, message = "Cancel URL can have max of 500 characters")
    private String cancelURL;

    @Size(max = 500, message = "Success URL can have max of 500 characters")
    private String successURL;

    private Long subscriptionId;

    private Long fineId;
}
