package org.vaishnav.safarsetu.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.vaishnav.safarsetu.domain.PaymentGateway;
import org.vaishnav.safarsetu.domain.PaymentType;
import org.vaishnav.safarsetu.exception.SubscriptionPlanException;
import org.vaishnav.safarsetu.mapper.SubscriptionMapper;
import org.vaishnav.safarsetu.models.Subscription;
import org.vaishnav.safarsetu.models.SubscriptionPlan;
import org.vaishnav.safarsetu.models.User;
import org.vaishnav.safarsetu.payload.dto.SubscriptionDto;
import org.vaishnav.safarsetu.payload.request.PaymentInitiateRequest;
import org.vaishnav.safarsetu.payload.response.PaymentInitiateResponse;
import org.vaishnav.safarsetu.repository.SubscriptionPlanRepository;
import org.vaishnav.safarsetu.repository.SubscriptionRepository;
import org.vaishnav.safarsetu.service.PaymentService;
import org.vaishnav.safarsetu.service.SubscriptionService;
import org.vaishnav.safarsetu.service.UserService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SubscriptionServiceImpl implements SubscriptionService {
    private final SubscriptionRepository subscriptionRepository;
    private final SubscriptionMapper subscriptionMapper;
    private final SubscriptionPlanRepository subscriptionPlanRepository;
    private final UserService userService;
    private final PaymentService paymentService;

    @Override
    public PaymentInitiateResponse subscribe(SubscriptionDto dto) throws Exception {
        User user = userService.getCurrentUser();

        SubscriptionPlan plan = subscriptionPlanRepository.findById( dto.getPlanId() )
                .orElseThrow(() -> new SubscriptionPlanException("Subscription Plan not found with id: " + dto.getPlanId()));

        Subscription subscription = subscriptionMapper.getEntityFromDto( dto );
        subscription.initializeFromPlan(plan);
        subscription.setActive(false);
        Subscription savedSubscription = subscriptionRepository.save(subscription);

        PaymentInitiateRequest request = PaymentInitiateRequest.builder()
                .userId(user.getId())
                .subscriptionId(savedSubscription.getId())
                .paymentType(PaymentType.MEMBERSHIP)
                .paymentGateway(PaymentGateway.RAZORPAY)
                .amount(savedSubscription.getPrice().longValue())
                .description("Safar Setu Subscription Plan " + plan.getPlanName() + " - " + plan.getPlanCode())
                .build();

        return paymentService.initiatePayment(request);
    }

    @Override
    public SubscriptionDto getUserActiveSubscriptions(Long userId) throws Exception {
        User user = userService.getCurrentUser();

        Subscription subscription = subscriptionRepository
                .findActiveSubscriptionsByUserId(user.getId(), LocalDate.now())
                .orElse(null);

        if(subscription == null) {return null;}

        return subscriptionMapper.getDtoFromEntity(subscription);
    }

    @Override
    public SubscriptionDto cancelSubscriptions(Long subscriptionId, String reason) throws Exception {
        Subscription subscription = subscriptionRepository.findById(subscriptionId)
                .orElseThrow( () -> new Exception("Subscription not found with id: " + subscriptionId) );

        subscription.setCancelledAt(LocalDateTime.now());
        subscription.setCancellationReason( (reason != null) ? reason : "Cancelled by User" );
        subscription.setActive(false);

        Subscription cancelledSubscription = subscriptionRepository.save(subscription);
        return subscriptionMapper.getDtoFromEntity( cancelledSubscription );
    }

    @Override
    public SubscriptionDto activateSubscription(Long subscriptionId, Long paymentId) throws Exception {
        Subscription subscription = subscriptionRepository.findById(subscriptionId)
                .orElseThrow( () -> new Exception("Subscription not found with id: " + subscriptionId) );


        // TODO : To be Implemented

        subscription.setActive(true);

        Subscription savedSubscription = subscriptionRepository.save(subscription);

        return subscriptionMapper.getDtoFromEntity( savedSubscription );
    }

    @Override
    public List<SubscriptionDto> getAllSubscriptions(Pageable pageable) {
        List<Subscription> subscriptions = subscriptionRepository.findAll();

        return subscriptionMapper.getDtosFromEntities(subscriptions);
    }

    @Override
    public void deactivateExpiredSubscription() throws Exception {
        List<Subscription> expired = subscriptionRepository.findExpiredActiveSubscription(LocalDate.now());

        for (Subscription subscription : expired) {
            subscription.setActive(false);
            subscriptionRepository.save(subscription);
        }
    }
}
