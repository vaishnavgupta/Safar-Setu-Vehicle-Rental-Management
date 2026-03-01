package org.vaishnav.safarsetu.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.vaishnav.safarsetu.models.VehicleCategory;
import org.vaishnav.safarsetu.payload.dto.VehicleCategoryDto;
import org.vaishnav.safarsetu.repository.VehicleCategoryRepository;

import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class VehicleCategoryMapper {

    private final VehicleCategoryRepository vehicleCategoryRepository;

    public static VehicleCategoryDto getVehicleCategoryDto(VehicleCategory savedVehicleCategory) {

        if(savedVehicleCategory==null){ return null; }

        VehicleCategoryDto dto = new VehicleCategoryDto();
        dto.setId( savedVehicleCategory.getId() );
        dto.setCode( savedVehicleCategory.getCode() );
        dto.setName( savedVehicleCategory.getName() );
        dto.setDescription( savedVehicleCategory.getDescription() );
        dto.setDisplayOrder( savedVehicleCategory.getDisplayOrder() );
        dto.setActive( savedVehicleCategory.getActive() );

        if( savedVehicleCategory.getParentCategory() != null){
            dto.setParentCategoryId( savedVehicleCategory.getParentCategory().getId() );
            dto.setParentCategoryName(savedVehicleCategory.getParentCategory().getName() );
        }

        // Taking only active categories => while converting them to DTOs
        if( savedVehicleCategory.getSubCategories() != null && !savedVehicleCategory.getSubCategories().isEmpty()){
            dto.setSubCategories(
                    savedVehicleCategory.getSubCategories().stream()
                            .filter(subCategory -> subCategory.getActive())
                            .map(subCategory -> getVehicleCategoryDto(subCategory))
                            .collect(Collectors.toList())
            );
            dto.setVehicleCount( (long) savedVehicleCategory.getSubCategories().size() );
        }


        dto.setUpdatedAt( savedVehicleCategory.getUpdatedAt() );
        dto.setCreatedAt( savedVehicleCategory.getCreatedAt() );
        return dto;
    }

    public static VehicleCategory getVehicleCategory(VehicleCategoryDto vehicleCategoryDto) {
        if(vehicleCategoryDto==null){ return null; }

        return VehicleCategory.builder()
                .code(vehicleCategoryDto.getCode())
                .name(vehicleCategoryDto.getName())
                .description(vehicleCategoryDto.getDescription())
                .displayOrder(vehicleCategoryDto.getDisplayOrder())
                .active(true)

                .build();
    }

    public void updateEntityFromDto(VehicleCategoryDto vehicleCategoryDto, VehicleCategory vehicleCategory) {
        if(vehicleCategoryDto==null || vehicleCategory==null ){ return; }

        vehicleCategory.setCode( vehicleCategoryDto.getCode() );

        vehicleCategory.setName(vehicleCategoryDto.getName() );

        vehicleCategory.setDescription(vehicleCategoryDto.getDescription() );

        vehicleCategory.setDisplayOrder( vehicleCategoryDto.getDisplayOrder() != null ? vehicleCategoryDto.getDisplayOrder() : 0 );

        if( vehicleCategoryDto.getActive() != null ) vehicleCategory.setActive( vehicleCategoryDto.getActive() );

        if( vehicleCategoryDto.getParentCategoryId() != null ){
            vehicleCategoryRepository.findById(vehicleCategoryDto.getParentCategoryId())
                    .ifPresent(vehicleCategory::setParentCategory);
        }
    }
}
