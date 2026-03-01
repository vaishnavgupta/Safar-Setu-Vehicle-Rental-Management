package org.vaishnav.safarsetu.payload.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.vaishnav.safarsetu.domain.RentalStatus;
import org.vaishnav.safarsetu.domain.RentalType;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VehicleRentalsDto {
    private Long id;
    private Long userId;
    private String userName;
    private String userEmail;
    private Long vehicleId;
    private String vehicleModelName;
    private String vehicleRegsNo;
    private String vehicleBrand;
    private String vehicleImageUrl;
    private RentalType type;
    private RentalStatus status;
    private LocalDate checkoutDate;
    private LocalDate dueDate;  //
    private Long remainingDays;
    private LocalDate returnDate;
    private int extensionCount;
    private int maxExtensionCount;
    private BigDecimal fineAmount;
    private Boolean finePaid;
    private String notes;
    private Boolean isOverdue;
    private int overdueDays;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
