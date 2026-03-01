package org.vaishnav.safarsetu.service;

import org.springframework.data.domain.Pageable;
import org.vaishnav.safarsetu.payload.dto.SubscriptionDto;
import org.vaishnav.safarsetu.payload.response.PaymentInitiateResponse;

import java.util.List;

public interface SubscriptionService {

    PaymentInitiateResponse subscribe(SubscriptionDto dto) throws Exception;

    SubscriptionDto getUserActiveSubscriptions (Long userId) throws Exception;

    SubscriptionDto cancelSubscriptions( Long subscriptionId, String reason) throws Exception;

    SubscriptionDto activateSubscription(Long subscriptionId, Long paymentId) throws Exception;

    List<SubscriptionDto> getAllSubscriptions(Pageable pageable);

    void deactivateExpiredSubscription() throws Exception;
}
