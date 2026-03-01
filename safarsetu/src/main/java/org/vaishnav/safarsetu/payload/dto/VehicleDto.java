package org.vaishnav.safarsetu.payload.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VehicleDto {
    private Long id;

    @NotBlank(message = "Registration Number is mandatory")
    private String registrationNumber;

    @NotBlank(message = "Model Number is mandatory")
    @Size(min = 1, max = 255, message = "Model Name must be less than 255 characters")
    private String modelName;

    @NotBlank(message = "Brand Name is mandatory")
    @Size(min = 1, max = 200, message = "Brand Name must be less than 200 characters")
    private String brand;

    @NotNull(message = "Vehicle category is mandatory")
    private Long categoryId;

    private String categoryName;

    private String categoryCode;

    @Size(max = 50, message = "Variant Name must be less than 50 characters")
    private String variant;

    private LocalDate manufacturingDate;

    @NotBlank(message = "Fuel Type is required")
    private String fuelType;

    @Min(value = 1, message = "Seats must be atleast 1")
    @Max(value = 1000, message = "Seats must be atmost 1000")
    private int seatingCapacity;

    @Size(max = 2000, message = "Description must not exceed 2000 characters")
    private String description;

    @Min(value = 0, message = "Total units cannot be negative")
    @NotNull(message = "Total units is required")
    private Integer totalUnits;

    @Min(value = 0, message = "Available units cannot be negative")
    @NotNull(message = "Available units is required")
    private Integer availableUnits;

    @DecimalMin(value = "0.0", inclusive = true, message = "Rental Price cannot be negative")
    @Digits(integer = 10, fraction = 2, message = "Rental Price have at most 10 integer digits and 2 fractional digits")
    private BigDecimal rentalPrice;

    @Size(max = 500, message = "Vehicle Image Url must have atmost 500 characters")
    private String vehicleImageUrl;

    private Boolean active ;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private Boolean alreadyHaveLoan;

    private Boolean alreadyHaveVehicle;

}
