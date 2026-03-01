package org.vaishnav.safarsetu.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.vaishnav.safarsetu.models.Fine;
import org.vaishnav.safarsetu.payload.dto.FineDto;

@Component
@RequiredArgsConstructor
public class FineMapper {

    public FineDto fineToDto(Fine fine) {
        if(fine == null)
            return null;
        FineDto dto = FineDto.builder()
                .id(fine.getId())
                .fineType(fine.getFineType())
                .amount(fine.getAmount())
                .status(fine.getFineStatus())
                .reason(fine.getReason())
                .notes(fine.getNote())
                .build();

        if( fine.getVehicleRentals() != null ) {
            dto.setVehicleRentalId(fine.getVehicleRentals().getId());
            if( fine.getVehicleRentals().getVehicle() != null ) {
                dto.setVehicleRegsNo(fine.getVehicleRentals().getVehicle().getRegistrationNumber());
                dto.setVehicleTitle(fine.getVehicleRentals().getVehicle().getModelName());
            }
        }
        if ( fine.getUser() != null ) {
            dto.setUserId(fine.getUser().getId());
            dto.setUsername(fine.getUser().getFullName());
            dto.setUserEmail(fine.getUser().getEmail());
        }

        if (fine.getWaivedBy() != null ) {
            dto.setWaivedByUserId(fine.getWaivedBy().getId());
            dto.setWaivedByUserName(fine.getWaivedBy().getFullName());
        }
        dto.setWaiverReason(fine.getWaiverReason());
        dto.setWaivedAt(fine.getWaivedAt());

        dto.setPaidAt(fine.getPaidAt());
        if ( fine.getProcessedBy() != null ) {
            dto.setProcessedByUserId(fine.getProcessedBy().getId());
            dto.setProcessedByUserName(fine.getProcessedBy().getFullName());
        }
        dto.setTransactionId(fine.getTransactionId());

        dto.setCreatedAt(fine.getCreatedAt());
        dto.setUpdatedAt(fine.getUpdatedAt());
        dto.setPaidAt(fine.getPaidAt());

        return dto;
    }

}
