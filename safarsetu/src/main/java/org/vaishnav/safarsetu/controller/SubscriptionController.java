package org.vaishnav.safarsetu.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.vaishnav.safarsetu.payload.dto.SubscriptionDto;
import org.vaishnav.safarsetu.payload.response.PaymentInitiateResponse;
import org.vaishnav.safarsetu.service.SubscriptionService;

@RestController
@RequestMapping("/api/subscriptions")
@RequiredArgsConstructor
public class SubscriptionController {
    public final SubscriptionService subscriptionService;

    @PostMapping("/subscribe")
    public ResponseEntity<?> subscribe(
            @Valid @RequestBody SubscriptionDto dto
    ) throws Exception {
        PaymentInitiateResponse paymentInitiateResponse = subscriptionService.subscribe(dto);
        return ResponseEntity.ok().body(paymentInitiateResponse);
    }

    // Get All Active Subscriptions & DeactivateExpired-> AdminController

    @GetMapping("/active")
    public ResponseEntity<?> getActiveSubscriptions(
            @RequestParam(required = false) Long userId
    ) throws Exception {
        SubscriptionDto dto = subscriptionService.getUserActiveSubscriptions(userId);
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/cancel/{subscriptionId}")
    public ResponseEntity<?> cancelSubscriptions(
            @PathVariable Long subscriptionId,
            @RequestParam(required = false) String reason
    ) throws Exception {
        SubscriptionDto cancelledSubscription = subscriptionService.cancelSubscriptions(
                subscriptionId,
                reason
        );
        return ResponseEntity.ok(cancelledSubscription);
    }

    @PostMapping("/activate")
    public ResponseEntity<?> activateSubscription(
            @RequestParam Long subscriptionId,
            @RequestParam Long paymentId
    ) throws Exception {
        SubscriptionDto activatedSubscription = subscriptionService.activateSubscription(
                subscriptionId,
                paymentId
        );
        return ResponseEntity.ok(activatedSubscription);
    }

}
