package org.vaishnav.safarsetu.payload.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VehicleReviewDto {
    private Long id;

    @NotNull(message = "User Id is mandatory")
    private Long userId;
    private String userName;
    private String userEmail;

    @NotNull(message = "Vehicle Id is mandatory")
    private Long vehicleId;
    private String vehicleModelName;
    private String vehicleRegsNo;
    private String vehicleBrand;

    @NotNull(message = "Rating is mandatory")
    @Min(value = 1, message = "Rating must be atleast 1")
    @Max(value = 5, message = "Rating must not exceed 5")
    private Integer rating;

    @NotBlank(message = "Rating Text is mandatory")
    @Size(min = 10, max = 2000, message = "Review must be between 10 to 2000 characters")
    private String reviewText;

    @Size( max = 200, message = "Title must be between 0 to 200 characters")
    private String title;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
