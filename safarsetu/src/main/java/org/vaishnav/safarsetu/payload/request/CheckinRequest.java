package org.vaishnav.safarsetu.payload.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.vaishnav.safarsetu.domain.RentalStatus;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CheckinRequest {

    @NotNull(message = "Vehicle Rental Id is mandatory")
    private Long vehicleRentalId;

    // LOST, DAMAGED, OVERDUE otherwise RETURNED
    private RentalStatus condition = RentalStatus.RETURNED;

    private String notes;
}
