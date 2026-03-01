package org.vaishnav.safarsetu.payload.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WaiveFineRequest {
    @NotNull(message = "Fine ID is mandatory")
    private Long fineId;

    @NotNull(message = "Waiving Reason is mandatory")
    @Size(min = 20, max = 300, message = "Waiving Reason have between 20 to 300 characters")
    private String reason;
}
