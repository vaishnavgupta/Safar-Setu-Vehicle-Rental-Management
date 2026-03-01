package org.vaishnav.safarsetu.payload.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.vaishnav.safarsetu.domain.ReservationStatus;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReservationDto {
    private Long id;

    private Long userId;
    private String userName;
    private String userEmail;

    private Long vehicleId;
    private String vehicleModelName;
    private String vehicleRegsNo;
    private String vehicleBrand;
    private boolean isVehicleAvailable;

    private ReservationStatus status;
    private LocalDateTime reservedAt;
    private LocalDateTime availableAt;
    private LocalDateTime availableUntil;
    private LocalDateTime fulfilledAt;
    private LocalDateTime cancelledAt;
    private int queuePosition;
    private boolean notificationSent;
    private String notes;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private boolean isExpired;
    private boolean canBeCancelled;
    private Long hoursUntilExpiry; // Hours remaining for pickup
}
