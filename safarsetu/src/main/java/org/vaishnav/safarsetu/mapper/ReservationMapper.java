package org.vaishnav.safarsetu.mapper;

import org.springframework.stereotype.Component;
import org.vaishnav.safarsetu.models.Reservation;
import org.vaishnav.safarsetu.models.User;
import org.vaishnav.safarsetu.models.Vehicle;
import org.vaishnav.safarsetu.payload.dto.ReservationDto;

import java.time.Duration;
import java.time.LocalDateTime;

@Component
public class ReservationMapper {

    public ReservationDto reservationToDto(Reservation reservation) {
        if( reservation == null ) return null;

        ReservationDto dto = new ReservationDto();
        dto.setId(reservation.getId());

        if( reservation.getUser() != null ) {
            User user = reservation.getUser();
            dto.setUserId( user.getId() );
            dto.setUserEmail( user.getEmail() );
            dto.setUserName(user.getFullName());
        }

        if( reservation.getVehicle() != null ) {
            Vehicle vehicle = reservation.getVehicle();
            dto.setVehicleId(vehicle.getId());
            dto.setVehicleModelName(vehicle.getModelName());
            dto.setVehicleRegsNo(vehicle.getRegistrationNumber());
            dto.setVehicleBrand(vehicle.getBrand());
            dto.setVehicleAvailable(vehicle.getAvailableUnits() > 0);
        }

        dto.setStatus(reservation.getStatus());
        dto.setReservedAt(reservation.getReservedAt());
        dto.setAvailableAt(reservation.getAvailableAt());
        dto.setAvailableUntil(reservation.getAvailableUntil());
        dto.setFulfilledAt(reservation.getFulfilledAt());
        dto. setCancelledAt(reservation.getCancelledAt());
        dto.setQueuePosition(reservation.getQueuePosition());
        dto.setNotificationSent(reservation.isNotificationSent());
        dto.setNotes(reservation.getNotes());
        dto.setCreatedAt(reservation.getCreatedAt());
        dto.setUpdatedAt(reservation.getUpdatedAt());

        dto.setExpired(reservation.hasExpired());
        dto.setCanBeCancelled(reservation.canBeCancelled());

        //Hours until expiry
        if( reservation.getAvailableUntil() != null ) {
            LocalDateTime now =  LocalDateTime.now();
            if( now.isBefore(reservation.getAvailableUntil()) ) {
                long hrs = Duration.between(now, reservation.getAvailableUntil()).toHours();
                dto.setHoursUntilExpiry(hrs);
            }
            else dto.setHoursUntilExpiry(0L);
        }

        return null;
    }

}
