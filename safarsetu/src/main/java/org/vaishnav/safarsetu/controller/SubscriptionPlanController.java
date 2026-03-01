package org.vaishnav.safarsetu.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.vaishnav.safarsetu.payload.dto.SubscriptionPlanDto;
import org.vaishnav.safarsetu.service.SubscriptionPlanService;

import java.util.List;

@RestController
@RequestMapping("/api/subscription-plans")
@RequiredArgsConstructor
public class SubscriptionPlanController {
    private final SubscriptionPlanService subscriptionPlanService;

    @GetMapping
    public ResponseEntity< List<SubscriptionPlanDto> > getSubscriptionPlans() {
        List<SubscriptionPlanDto> plans = subscriptionPlanService.getAllSubscriptionPlan();
        return ResponseEntity.ok(plans);
    }

    // Rest in AdminController
}
