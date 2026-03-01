package org.vaishnav.safarsetu.payload.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.vaishnav.safarsetu.domain.TripType;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TripPlannerRequest {
    private Integer distanceKm;
    private Integer durationDays;
    private Integer passengers;
    private Double budget;
    private TripType tripType;
    private Boolean luggageRequired;
}
