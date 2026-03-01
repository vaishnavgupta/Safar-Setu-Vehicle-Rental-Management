package org.vaishnav.safarsetu.mapper;

import org.springframework.stereotype.Component;
import org.vaishnav.safarsetu.models.User;
import org.vaishnav.safarsetu.models.Vehicle;
import org.vaishnav.safarsetu.models.VehicleReview;
import org.vaishnav.safarsetu.payload.dto.VehicleReviewDto;

@Component
public class VehicleReviewMapper {

    public VehicleReviewDto reviewToDto(VehicleReview review) {
        if(review == null)
            return null;
        VehicleReviewDto dto = VehicleReviewDto.builder()
                .rating(review.getRating())
                .title(review.getTitle())
                .reviewText(review.getReviewText())
                .createdAt(review.getCreatedAt())
                .updatedAt(review.getUpdatedAt())
                .build();

        if( review.getUser() != null ) {
            User user = review.getUser();
            dto.setUserId(user.getId());
            dto.setUserName(user.getFullName());
            dto.setUserEmail(user.getEmail());
        }

        if( review.getVehicle() != null ) {
            Vehicle vehicle = review.getVehicle();
            dto.setVehicleId(vehicle.getId());
            dto.setVehicleModelName(vehicle.getModelName());
            dto.setVehicleRegsNo(vehicle.getRegistrationNumber());
            dto.setVehicleBrand(vehicle.getBrand());
        }

        return dto;
    }

}
