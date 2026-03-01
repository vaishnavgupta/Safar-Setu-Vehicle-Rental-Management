package org.vaishnav.safarsetu.payload.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.vaishnav.safarsetu.domain.ReservationStatus;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReservationSearchRequest {

    private Long vehicleId;

    private Long userId;

    private ReservationStatus status;

    private boolean active0nly;

    private int page = 0;
    private int size = 20;

    private String sortBy = "reservedAt";
    private String sortDirection = "DESC";

}
