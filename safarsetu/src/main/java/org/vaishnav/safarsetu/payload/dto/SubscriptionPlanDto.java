package org.vaishnav.safarsetu.payload.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SubscriptionPlanDto {
    private Long id;

    @NotBlank(message = "Plan Code is unique and mandatory")
    private String planCode;

    @NotBlank(message = "Plan Name is mandatory")
    private String planName;

    private String description;

    @NotNull(message = "Subscription Price is mandatory")
    @Positive(message = "Subscription Price must be positive")
    private BigDecimal price;

    @NotNull(message = "Subscription Validity Days is mandatory")
    @Positive(message = "Subscription Validity Days  must be positive")
    private int validityInDays;

    @NotNull(message = "maxVehiclesAllowed is mandatory")
    @Positive(message = "maxVehiclesAllowed must be positive")
    private int maxVehiclesAllowed;

    @NotNull(message = "Badge Features is mandatory")
    private String badgeFeatures;

    private int displayOrder = 0;

    private boolean autoRenew ;

    private boolean active ;

    private boolean isFeatured ;

    private String adminNotes;
}
