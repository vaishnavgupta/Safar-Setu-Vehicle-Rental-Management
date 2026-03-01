package org.vaishnav.safarsetu.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SubscriptionPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true, nullable = false)
    private String planCode;

    @Column(nullable = false, length = 100)
    private String planName;

    @Column(length = 100)
    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private int validityInDays;

    @Column(nullable = false)
    @Positive(message = "Max Vehicles must be positive")
    private int maxVehiclesAllowed;

    @Column(nullable = false)
    private String badgeFeatures;

    private int displayOrder = 0;

    private boolean autoRenew = false;

    private boolean active = true;

    private boolean isFeatured = false;

    private String adminNotes;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
