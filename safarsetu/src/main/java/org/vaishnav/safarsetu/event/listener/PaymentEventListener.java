package org.vaishnav.safarsetu.event.listener;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.vaishnav.safarsetu.models.Payment;
import org.vaishnav.safarsetu.service.SubscriptionService;

@Component
@RequiredArgsConstructor
public class PaymentEventListener {

    private final SubscriptionService subscriptionService;

    @Async
    @EventListener
    @Transactional
    public void handlePaymentSuccess(Payment payment) throws Exception {
        switch (payment.getPaymentType()) {
            case FINE :
            case LOST_VEHICLE :
            case REFUND:
            case MEMBERSHIP:
                subscriptionService.activateSubscription(
                        payment.getSubscription().getId(),
                        payment.getId()
                );
                break;
        }
    }

}
