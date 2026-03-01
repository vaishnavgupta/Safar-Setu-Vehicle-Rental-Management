package org.vaishnav.safarsetu.payload.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SubscriptionDto {
    @NotNull(message = "User Id is mandatory")
    private Long userId;

    private String userEmail;

    private String userName;

    @NotNull(message = "Plan Id is mandatory")
    private Long planId;

    private String planName;

    private String planCode;

    private BigDecimal price;

    private LocalDate startDate;

    private LocalDate endDate;

    private boolean isActive ;

    private int maxVehiclesAllowed;

    private int maxDaysPerVehicle;

    private boolean autoRenew ;

    private LocalDateTime cancelledAt;

    private String cancellationReason;

    private String adminNotes;

    private Long daysRemaining;

    private boolean isValid;

    private boolean isExpired;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
