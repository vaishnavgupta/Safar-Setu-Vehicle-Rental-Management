package org.vaishnav.safarsetu.service;

import org.vaishnav.safarsetu.exception.SubscriptionPlanException;
import org.vaishnav.safarsetu.models.SubscriptionPlan;
import org.vaishnav.safarsetu.payload.dto.SubscriptionPlanDto;

import java.util.List;

public interface SubscriptionPlanService {
    SubscriptionPlanDto createSubscriptionPlan(SubscriptionPlanDto dto) throws SubscriptionPlanException;

    SubscriptionPlanDto updateSubscriptionPlan(Long id, SubscriptionPlanDto dto) throws SubscriptionPlanException;

    void deleteSubscriptionPlan(Long id) throws SubscriptionPlanException;

    List<SubscriptionPlanDto> getAllSubscriptionPlan();

    SubscriptionPlan getSubscriptionByCode(String planCode) throws SubscriptionPlanException;
}
