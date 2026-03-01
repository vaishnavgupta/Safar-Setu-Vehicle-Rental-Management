package org.vaishnav.safarsetu.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.vaishnav.safarsetu.exception.SubscriptionPlanException;
import org.vaishnav.safarsetu.mapper.SubscriptionPlanMapper;
import org.vaishnav.safarsetu.models.SubscriptionPlan;
import org.vaishnav.safarsetu.payload.dto.SubscriptionPlanDto;
import org.vaishnav.safarsetu.repository.SubscriptionPlanRepository;
import org.vaishnav.safarsetu.service.SubscriptionPlanService;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SubscriptionPlanServiceImpl implements SubscriptionPlanService {

    private final SubscriptionPlanRepository subsPlanRepo;
    private final SubscriptionPlanMapper subsPlanMapper;

    @Override
    public SubscriptionPlanDto createSubscriptionPlan(SubscriptionPlanDto dto) throws SubscriptionPlanException {
        if( subsPlanRepo.existsByPlanCode(dto.getPlanCode()) ){
            throw new SubscriptionPlanException("Subscription Plan already exists with code: " + dto.getPlanCode());
        }
        SubscriptionPlan savedSubscriptionPlan = subsPlanRepo.save( subsPlanMapper.subscriptionPlanDtoToEntity(dto) );

        return subsPlanMapper.entityToSubscriptionPlanDto(savedSubscriptionPlan);
    }

    @Override
    public SubscriptionPlanDto updateSubscriptionPlan(Long id, SubscriptionPlanDto dto) throws SubscriptionPlanException {
        SubscriptionPlan plan = subsPlanRepo.findById(id)
                .orElseThrow( () -> new SubscriptionPlanException("No Subscription Plan exists with id: " + id) );

        subsPlanMapper.updateEntityFromSubscriptionPlanDto(dto, plan);

        subsPlanRepo.save(plan);

        return subsPlanMapper.entityToSubscriptionPlanDto(plan);
    }

    @Override
    public void deleteSubscriptionPlan(Long id) throws SubscriptionPlanException {
        SubscriptionPlan plan = subsPlanRepo.findById(id)
                .orElseThrow( () -> new SubscriptionPlanException("No Subscription Plan exists with id: " + id) );

        subsPlanRepo.delete(plan);
    }

    @Override
    public List<SubscriptionPlanDto> getAllSubscriptionPlan() {
        return subsPlanRepo.findAll()
                .stream()
                .map(plan -> subsPlanMapper.entityToSubscriptionPlanDto(plan))
                .toList();
    }

    @Override
    public SubscriptionPlan getSubscriptionByCode(String planCode) throws SubscriptionPlanException {
        return subsPlanRepo.findByPlanCode(planCode)
                .orElseThrow( () -> new SubscriptionPlanException("No Subscription Plan exists with code: " + planCode) );
    }
}
