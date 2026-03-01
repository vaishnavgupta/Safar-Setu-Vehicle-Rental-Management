package org.vaishnav.safarsetu.mapper;

import org.springframework.stereotype.Component;
import org.vaishnav.safarsetu.models.SubscriptionPlan;
import org.vaishnav.safarsetu.payload.dto.SubscriptionPlanDto;

@Component
public class SubscriptionPlanMapper {
    public SubscriptionPlan subscriptionPlanDtoToEntity(SubscriptionPlanDto dto) {
        if(dto == null) return null;

        return SubscriptionPlan.builder()
                .planCode(dto.getPlanCode())
                .planName(dto.getPlanName())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .validityInDays(dto.getValidityInDays())
                .maxVehiclesAllowed(dto.getMaxVehiclesAllowed())
                .displayOrder(dto.getDisplayOrder())
                .adminNotes(dto.getAdminNotes())
                .active(dto.isActive())
                .autoRenew(dto.isAutoRenew())
                .isFeatured(dto.isFeatured())
                .badgeFeatures(dto.getBadgeFeatures())
                .build();
    }

    public SubscriptionPlanDto entityToSubscriptionPlanDto(SubscriptionPlan entity) {
        if(entity == null) return null;

        return SubscriptionPlanDto.builder()
                .id(entity.getId())
                .planCode(entity.getPlanCode())
                .planName(entity.getPlanName())
                .description(entity.getDescription())
                .price(entity.getPrice())
                .validityInDays(entity.getValidityInDays())
                .maxVehiclesAllowed(entity.getMaxVehiclesAllowed())
                .displayOrder(entity.getDisplayOrder())
                .badgeFeatures(entity.getBadgeFeatures())
                .active(entity.isActive())
                .autoRenew(entity.isAutoRenew())
                .isFeatured(entity.isFeatured())
                .adminNotes(entity.getAdminNotes())
                .build();
    }

    public void updateEntityFromSubscriptionPlanDto(SubscriptionPlanDto dto, SubscriptionPlan entity) {
        if(dto == null ||  entity == null) return;

        entity.setPlanName(dto.getPlanName());
        entity.setDescription(dto.getDescription());
        entity.setPrice(dto.getPrice());
        entity.setValidityInDays(dto.getValidityInDays());
        entity.setMaxVehiclesAllowed(dto.getMaxVehiclesAllowed());
        entity.setDisplayOrder(dto.getDisplayOrder());
        entity.setBadgeFeatures(dto.getBadgeFeatures());
        entity.setActive(dto.isActive());
        entity.setAutoRenew(dto.isAutoRenew());
        entity.setFeatured(dto.isFeatured());
        entity.setAdminNotes(dto.getAdminNotes());
    }
}
