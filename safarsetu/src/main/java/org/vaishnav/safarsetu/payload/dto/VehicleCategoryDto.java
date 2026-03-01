package org.vaishnav.safarsetu.payload.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VehicleCategoryDto {
    private Long id;

    private String code;

    private String name;

    private String description;

    private Integer displayOrder = 0;

    @Column(nullable = false)
    private Boolean active = true;

    private Long parentCategoryId;

    private String parentCategoryName;

    private List<VehicleCategoryDto> subCategories;

    private Long vehicleCount;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
