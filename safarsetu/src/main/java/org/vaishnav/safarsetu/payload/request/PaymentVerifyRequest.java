package org.vaishnav.safarsetu.payload.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentVerifyRequest {
    @NotNull(message = "Razorpay Payment Id is required")
    private String razorpayPaymentId;
}
