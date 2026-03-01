package org.vaishnav.safarsetu.payload.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.vaishnav.safarsetu.domain.FineStatus;
import org.vaishnav.safarsetu.domain.FineType;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FineDto {
    private Long id;

    @NotNull(message = "Vehicle Rental ID is required")
    private Long vehicleRentalId;

    private String vehicleTitle;

    private String vehicleRegsNo;

    @NotNull(message = "User Id is mandatory")
    private Long userId;

    private String username;

    private String userEmail;

    @NotNull(message = "Fine Type is required")
    private FineType fineType;

    @NotNull(message = "Fine Amount is required")
    @PositiveOrZero(message = "Fine Amount must be greater or equal to zero")
    private Long amount;

    @PositiveOrZero(message = "Paid Fine Amount must be greater or equal to zero")
    private Long amountPaid;

    private Long amountOutstanding;

    @NotNull(message = "Fine Status is mandatory")
    private FineStatus status;

    private String reason;

    private String notes;

    private Long waivedByUserId;

    private String waivedByUserName;

    private LocalDateTime waivedAt;

    private String waiverReason;

    private LocalDateTime paidAt;

    private Long processedByUserId;

    private String processedByUserName;

    private String transactionId;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
