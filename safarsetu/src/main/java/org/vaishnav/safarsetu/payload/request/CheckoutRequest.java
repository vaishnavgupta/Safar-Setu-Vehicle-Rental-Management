package org.vaishnav.safarsetu.payload.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CheckoutRequest {
    @NotNull(message = "Vehicle Id is Mandatory")
    private Long vehicleId;

    @Min(value = 1, message = "Minimum Rental Days is 1")
    @Max(value = 10, message = "Maximum Rental Days is 10")
    private int returnDays = 3;     //Default = 3

    @NotNull(message = "Provide additional notes about User and Vehicle")
    private String notes;

}
