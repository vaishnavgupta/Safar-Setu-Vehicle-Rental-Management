package org.vaishnav.safarsetu.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.vaishnav.safarsetu.models.User;
import org.vaishnav.safarsetu.models.Vehicle;
import org.vaishnav.safarsetu.models.VehicleRentals;
import org.vaishnav.safarsetu.payload.dto.VehicleRentalsDto;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Component
@RequiredArgsConstructor
public class VehicleRentalsMapper {

    public VehicleRentalsDto rentalToDto(VehicleRentals vehicleRentals) {
        if(vehicleRentals==null){
            return null;
        }

        VehicleRentalsDto dto = new VehicleRentalsDto();
        dto.setId(vehicleRentals.getId());

        if( vehicleRentals.getUser() != null ){
            User user = vehicleRentals.getUser();
            dto.setUserId(user.getId());
            dto.setUserEmail(user.getEmail());
            dto.setUserName(user.getFullName());
        }

        if( vehicleRentals.getVehicle() != null ) {
            Vehicle vehicle = vehicleRentals.getVehicle();
            dto.setVehicleId(vehicle.getId());
            dto.setVehicleModelName(vehicle.getModelName());
            dto.setVehicleBrand(vehicle.getBrand());
            dto.setVehicleRegsNo(vehicle.getRegistrationNumber());
            dto.setVehicleImageUrl(vehicle.getVehicleImageUrl());
        }

        dto.setType(vehicleRentals.getType());
        dto.setStatus(vehicleRentals.getStatus());
        dto.setCheckoutDate(vehicleRentals.getCheckoutDate().toLocalDate());
        if(vehicleRentals.getReturnDate() != null) dto.setReturnDate(vehicleRentals.getReturnDate().toLocalDate());
        dto.setDueDate(vehicleRentals.getDueDate().toLocalDate());
        dto.setExtensionCount(vehicleRentals.getExtensionCount());
        dto.setMaxExtensionCount(vehicleRentals.getMaxExtensions());
        // TODO : Fine Part
        dto.setNotes(vehicleRentals.getNotes());
        dto.setIsOverdue(vehicleRentals.isOverdue());
        dto.setOverdueDays(vehicleRentals.getOverdueDays());
        dto.setCreatedAt(vehicleRentals.getCreatedAt());
        dto.setUpdatedAt(vehicleRentals.getUpdatedAt());
        dto.setRemainingDays(
                ChronoUnit.DAYS.between(
                        LocalDate.now(),
                        vehicleRentals.getDueDate().toLocalDate()
                )
        );

        return dto;
    }

}
