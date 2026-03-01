package org.vaishnav.safarsetu.payload.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TripPlannerResponse {
    private String recommendedVehicle;
    private String reason;
    private String alternativeVehicle;
    private String callToAction;
    private String estimatedCost;
    private Integer matchPercentage;
}
