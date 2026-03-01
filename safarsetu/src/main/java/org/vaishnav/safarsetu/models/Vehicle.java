package org.vaishnav.safarsetu.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.AssertTrue;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true, nullable = false)
    private String registrationNumber;

    @Column(nullable = false)
    private String modelName;

    @Column(nullable = false)
    private String brand;

    @JoinColumn(nullable = false)
    @ManyToOne
    private VehicleCategory category;

    private String variant;

    private LocalDate manufacturingDate;

    private String fuelType;

    @Column(nullable = false)
    private int seatingCapacity;

    private String description;

    @Column(nullable = false)
    private Integer totalUnits;

    @Column(nullable = false)
    private Integer availableUnits;

    @Column(nullable = false)
    private BigDecimal rentalPrice;

    private String vehicleImageUrl;

    @Column(nullable = false)
    private Boolean active = true;

    @CreationTimestamp
    @Column(nullable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    // Validation Method -> If true then only entity is valid
    @AssertTrue(message = "Available units cannot exceed total units")
    public Boolean isAvailableUnitsValid(){
        if( totalUnits == null || availableUnits == null ) {
            return true;
        }
        return availableUnits <= totalUnits;
    }
}
