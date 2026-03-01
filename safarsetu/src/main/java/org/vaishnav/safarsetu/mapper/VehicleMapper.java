package org.vaishnav.safarsetu.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;
import org.vaishnav.safarsetu.exception.VehicleException;
import org.vaishnav.safarsetu.models.Vehicle;
import org.vaishnav.safarsetu.models.VehicleCategory;
import org.vaishnav.safarsetu.payload.dto.VehicleDto;
import org.vaishnav.safarsetu.payload.response.PageResponse;
import org.vaishnav.safarsetu.repository.VehicleCategoryRepository;
import org.vaishnav.safarsetu.repository.VehicleRepository;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class VehicleMapper {
    private final VehicleCategoryRepository vehicleCategoryRepository;
    private final VehicleRepository vehicleRepository;

    public VehicleDto convertVehicleToVehicleDto(Vehicle vehicle){
        if (vehicle == null) return null;

        VehicleDto dto = VehicleDto.builder()
                .id(vehicle.getId())
                .modelName(vehicle.getModelName())
                .brand(vehicle.getBrand())
                .registrationNumber(vehicle.getRegistrationNumber())
                .variant(vehicle.getVariant())
                .manufacturingDate(vehicle.getManufacturingDate())
                .fuelType(vehicle.getFuelType())
                .seatingCapacity(vehicle.getSeatingCapacity())
                .description(vehicle.getDescription())
                .totalUnits(vehicle.getTotalUnits())
                .availableUnits(vehicle.getAvailableUnits())
                .rentalPrice(vehicle.getRentalPrice())
                .vehicleImageUrl(vehicle.getVehicleImageUrl())
                .active(vehicle.getActive())
                .createdAt(vehicle.getCreatedAt())
                .updatedAt(vehicle.getUpdatedAt())

                .build();

        if(vehicle.getCategory() != null){
            dto.setCategoryName(vehicle.getCategory().getName());
            dto.setCategoryId(vehicle.getCategory().getId());
            dto.setCategoryCode(vehicle.getCategory().getCode());
        }

        return dto;
    }

    public Vehicle convertVehicleDtoToVehicle(VehicleDto vehicleDto) throws VehicleException {
        if (vehicleDto == null) return null;

        Vehicle entity = Vehicle.builder()
                .id(vehicleDto.getId())
                .registrationNumber(vehicleDto.getRegistrationNumber())
                .modelName(vehicleDto.getModelName())
                .brand(vehicleDto.getBrand())
                .variant(vehicleDto.getVariant())
                .manufacturingDate(vehicleDto.getManufacturingDate())
                .fuelType(vehicleDto.getFuelType())
                .seatingCapacity(vehicleDto.getSeatingCapacity())
                .description(vehicleDto.getDescription())
                .totalUnits(vehicleDto.getTotalUnits())
                .availableUnits(vehicleDto.getAvailableUnits())
                .rentalPrice(vehicleDto.getRentalPrice())
                .vehicleImageUrl(vehicleDto.getVehicleImageUrl())
                .active(true)       //Default for active
                .createdAt(vehicleDto.getCreatedAt())
                .updatedAt(vehicleDto.getUpdatedAt())

                .build();

        if( vehicleDto.getCategoryId() != null ){
            VehicleCategory vehicleCategory = vehicleCategoryRepository.findById(vehicleDto.getCategoryId())
                    .orElseThrow(() -> new VehicleException("Vehicle Category Id does not exists with id: "+ vehicleDto.getCategoryId()));
            entity.setCategory(vehicleCategory);
        }

        return entity;
    }

    public void updateVehicleFromVehicleDto(Vehicle vehicle, VehicleDto vehicleDto) throws VehicleException {
        if (vehicleDto == null || vehicle == null) return;

        vehicle.setModelName(vehicleDto.getModelName());
        vehicle.setBrand(vehicleDto.getBrand());

        if( vehicleDto.getCategoryId() != null ){
            VehicleCategory vehicleCategory = vehicleCategoryRepository.findById(vehicleDto.getCategoryId())
                    .orElseThrow(() -> new VehicleException("Vehicle Category Id does not exists with id: "+ vehicleDto.getCategoryId()));
            vehicle.setCategory(vehicleCategory);
        }

        vehicle.setVariant(vehicleDto.getVariant());
        vehicle.setManufacturingDate(vehicleDto.getManufacturingDate());
        vehicle.setFuelType(vehicleDto.getFuelType());
        vehicle.setSeatingCapacity(vehicleDto.getSeatingCapacity());
        vehicle.setDescription(vehicleDto.getDescription());
        vehicle.setTotalUnits(vehicleDto.getTotalUnits());
        vehicle.setAvailableUnits(vehicleDto.getAvailableUnits());
        vehicle.setRentalPrice(vehicleDto.getRentalPrice());
        vehicle.setVehicleImageUrl(vehicleDto.getVehicleImageUrl());

        if(vehicleDto.getActive() != null){
            vehicle.setActive(vehicleDto.getActive());
        }

    }

    public PageResponse<VehicleDto> getPageResponseDto(Page<Vehicle> vehiclePage){
        List<VehicleDto> dtos = vehiclePage.getContent()
                .stream()
                .map(vehicle -> convertVehicleToVehicleDto(vehicle))
                .toList();

        return new PageResponse<>(
                dtos,
                vehiclePage.getNumber(),
                vehiclePage.getSize(),
                vehiclePage.getTotalElements(),
                vehiclePage.getTotalPages(),
                vehiclePage.isFirst(),
                vehiclePage.isLast(),
                vehiclePage.isEmpty()
        );
    }
}
