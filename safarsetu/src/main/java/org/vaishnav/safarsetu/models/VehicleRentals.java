package org.vaishnav.safarsetu.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.vaishnav.safarsetu.domain.RentalStatus;
import org.vaishnav.safarsetu.domain.RentalType;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VehicleRentals {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Vehicle vehicle;

    @Enumerated(EnumType.STRING)
    private RentalType type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RentalStatus status;

    @Column(nullable = false)
    private LocalDateTime checkoutDate;

    private LocalDateTime returnDate;

    @Column(nullable = false)
    private LocalDateTime dueDate;

    private int extensionCount = 0;

    private int maxExtensions = 2;

    // TODO : List<Fine>

    @Column(length = 450)
    private String notes;

    private boolean isOverdue = false;

    private int overdueDays = 0;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    public boolean isActive() {
        return status == RentalStatus.ACTIVE || status == RentalStatus.OVERDUE;
    }

    public boolean canRenewExtension() {
        return this.status == RentalStatus.ACTIVE
                && !isOverdue
                && extensionCount < maxExtensions;
    }
}
