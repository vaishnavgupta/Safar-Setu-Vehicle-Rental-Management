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
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Subscription {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(nullable = false)
    private SubscriptionPlan plan;

    private String planName;

    @Column(nullable = false)
    private String planCode;

    private BigDecimal price;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    private boolean isActive = true;

    @Column(nullable = false)
    @Positive(message = "Max Vehicles allowed must be positive")
    private int maxVehiclesAllowed;

    @Column(nullable = false)
    @Positive(message = "Max Days per vehicle must be positive")
    private int maxDaysPerVehicle;

    private boolean autoRenew = false;

    private LocalDateTime cancelledAt;

    private String cancellationReason;

    private String adminNotes;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public boolean isValid() {
        if( !isActive ) return false;

        LocalDate today = LocalDate.now();
        return !today.isBefore(this.startDate) && !today.isAfter(this.endDate);
    }

    public boolean isExpired() {
        return LocalDate.now().isAfter(this.endDate);
    }

    public long getRemainingDays() {
        if( isExpired() ) return 0;

        return ChronoUnit.DAYS.between(LocalDate.now(), endDate);
    }

    public void initializeFromPlan(SubscriptionPlan plan) {
        if( plan != null){
            this.plan = plan;
            this.planName = plan.getPlanName();
            this.planCode = plan.getPlanCode();
            this.price = plan.getPrice();
            this.maxVehiclesAllowed = plan.getMaxVehiclesAllowed();
            this.maxDaysPerVehicle = 3;      //default
            if( startDate == null ) startDate = LocalDate.now();
            if(endDate == null) endDate = startDate.plusDays( plan.getValidityInDays() );
        }
    }

}
