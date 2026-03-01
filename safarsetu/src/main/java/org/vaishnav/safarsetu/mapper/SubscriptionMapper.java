package org.vaishnav.safarsetu.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.vaishnav.safarsetu.exception.SubscriptionPlanException;
import org.vaishnav.safarsetu.exception.UserException;
import org.vaishnav.safarsetu.models.Subscription;
import org.vaishnav.safarsetu.payload.dto.SubscriptionDto;
import org.vaishnav.safarsetu.repository.SubscriptionPlanRepository;
import org.vaishnav.safarsetu.repository.UserRepository;

import java.util.List;

@Component
@RequiredArgsConstructor
public class SubscriptionMapper {
    private final UserRepository userRepository;
    private final SubscriptionPlanRepository  subscriptionPlanRepository;

    public SubscriptionDto getDtoFromEntity(Subscription subscription) {
        if (subscription == null) {
            return null;
        }

        SubscriptionDto dto = new SubscriptionDto();

        dto.setUserId( subscription.getUser().getId() );
        dto.setUserName( subscription.getUser().getFullName() );
        dto.setUserEmail( subscription.getUser().getEmail() );
        dto.setPlanId( subscription.getPlan().getId() );
        dto.setPlanCode( subscription.getPlan().getPlanCode() );
        dto.setPlanName( subscription.getPlan().getPlanName() );
        dto.setPrice( subscription.getPrice() );
        dto.setStartDate( subscription.getStartDate() );
        dto.setEndDate( subscription.getEndDate() );
        dto.setActive( subscription.isActive() );
        dto.setMaxDaysPerVehicle( subscription.getMaxDaysPerVehicle() );
        dto.setMaxVehiclesAllowed( subscription.getMaxVehiclesAllowed() );
        dto.setAutoRenew( subscription.isAutoRenew() );
        dto.setCancelledAt( subscription.getCancelledAt() );
        dto.setCancellationReason( subscription.getCancellationReason() );
        dto.setAdminNotes( subscription.getAdminNotes() );
        dto.setDaysRemaining( subscription.getRemainingDays() );
        dto.setValid( subscription.isValid() );
        dto.setExpired( subscription.isExpired() );
        dto.setCreatedAt( subscription.getCreatedAt() );
        dto.setUpdatedAt( subscription.getUpdatedAt() );

        return dto;
    }

    public Subscription getEntityFromDto (SubscriptionDto dto) throws UserException, SubscriptionPlanException {
        if( dto == null ) {
            return null;
        }
        Subscription subscription = new Subscription();

        //finding User
        if( dto.getUserId() != null) {
            subscription.setUser(
                    userRepository.findById(dto.getUserId())
                            .orElseThrow( () -> new UserException("User(Subscription) does not exists with id: " + dto.getUserId()))
            );
        }

        //finding SubscriptionPlan
        if( dto.getPlanId() != null ) {
            subscription.setPlan(
                    subscriptionPlanRepository.findById(dto.getPlanId())
                            .orElseThrow( () -> new SubscriptionPlanException("Plan(Subscription) does not exists with id: " + dto.getPlanId()))
            );
        }

        subscription.setPlanName(dto.getPlanName() );
        subscription.setPlanCode(dto.getPlanCode() );
        subscription.setPrice(dto.getPrice());
        subscription.setStartDate(dto.getStartDate());
        subscription.setEndDate(dto.getEndDate());
        subscription.setActive(dto.isActive());
        subscription.setMaxDaysPerVehicle(dto.getMaxDaysPerVehicle());
        subscription.setMaxVehiclesAllowed( dto.getMaxVehiclesAllowed() );
        subscription.setAutoRenew(dto.isAutoRenew());
        subscription.setCancelledAt(dto.getCancelledAt());
        subscription.setCancellationReason(dto.getCancellationReason());
        subscription.setAdminNotes(dto.getAdminNotes());

        return  subscription;
    }

    public List<SubscriptionDto> getDtosFromEntities (List<Subscription> list) {

        if(list == null) return null;

        return list.stream()
                .map( subscription -> getDtoFromEntity(subscription) )
                .toList();

    }

}
