package org.vaishnav.safarsetu.payload.request;

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
public class RenewalRequest {
    @NotNull(message = "Vehicle Rental ID is mandatory")
    private Long vehicleRentalId;

    @Min(value = 1, message = "Extension days must be at least 1")
    private int extensionDays = 1;

    private String notes;
}
