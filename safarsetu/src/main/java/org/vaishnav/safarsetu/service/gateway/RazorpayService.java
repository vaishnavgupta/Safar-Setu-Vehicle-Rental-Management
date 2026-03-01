package org.vaishnav.safarsetu.service.gateway;

import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.vaishnav.safarsetu.domain.PaymentType;
import org.vaishnav.safarsetu.models.Payment;
import org.vaishnav.safarsetu.models.SubscriptionPlan;
import org.vaishnav.safarsetu.models.User;
import org.vaishnav.safarsetu.payload.response.PaymentLinkResponse;
import org.vaishnav.safarsetu.service.SubscriptionPlanService;

@Service
@RequiredArgsConstructor
public class RazorpayService {
    private final SubscriptionPlanService subscriptionPlanService;
    @Value("${razorpay.key.id}")
    private String razorpayId;

    @Value("${razorpay.key.secret}")
    private String razorpaySecret;

    @Value("${razorpay.callback.base-url}")
    private String callbackUrl;

    public PaymentLinkResponse createPaymentLink(User user, Payment payment) {
        try {
            RazorpayClient client = new RazorpayClient(razorpayId, razorpaySecret);

            Long amountInPaisa = payment.getAmount()*100;

            JSONObject paymentLinkRequest = new JSONObject();
            paymentLinkRequest.put("amount", amountInPaisa);
            paymentLinkRequest.put("currency", "INR");
            paymentLinkRequest.put("description", payment.getDescription());

            JSONObject customer = new JSONObject();
            customer.put("name", user.getFullName());
            customer.put("email", user.getEmail());
            if (user.getPhone() != null) {
                customer.put("contact", user.getPhone());
            }
            paymentLinkRequest.put("customer", customer);

            JSONObject notify = new JSONObject();
            notify.put("email", true);
            notify.put("sms", user.getPhone() != null);
            paymentLinkRequest.put("notify", notify);

            // Enable reminders
            paymentLinkRequest.put("reminder_enable", true);

            //Callback Configurations
            String successUrl = callbackUrl + "/payment-success/" + payment.getId();

            paymentLinkRequest.put("callback_url", successUrl);
            paymentLinkRequest.put("callback_method", "get");

            JSONObject notes = new JSONObject();
            notes.put("user_id", user.getId());
            notes.put("payment_id", payment.getId());

            if( payment.getPaymentType() == PaymentType.MEMBERSHIP ) {
                notes.put("subscription_id", payment.getSubscription().getId());
                notes.put("plan", payment.getSubscription().getPlan().getPlanCode());
                notes.put("type", PaymentType.MEMBERSHIP);
            }
            else if( payment.getPaymentType() == PaymentType.FINE ) {
                // TODO - Fine
                notes.put("type", PaymentType.FINE);
            }

            paymentLinkRequest.put("notes", notes);

            PaymentLink paymentLink = client.paymentLink.create(paymentLinkRequest);

            String paymentUrl = paymentLink.get("short_url");
            String paymentLinkId = paymentLink.get("id");

            return new PaymentLinkResponse(paymentUrl, paymentLinkId);

        } catch (RazorpayException e) {
            throw new RuntimeException(e);
        }
    }

    public JSONObject fetchPaymentDetails(String paymentId) throws Exception {

        try {
            RazorpayClient client = new RazorpayClient(razorpayId, razorpaySecret);
            com.razorpay.Payment payment = client.payments.fetch(paymentId);

            return payment.toJson();
        } catch (RazorpayException e) {
            throw new Exception("Failed to fetch payment details: " + e.getMessage(), e);
        }

    }

    public boolean isValidPayment(String paymentId) throws Exception {
        try {

            JSONObject paymentDetails = fetchPaymentDetails(paymentId);

            String status = paymentDetails.optString("status");
            long amount = paymentDetails.optLong("amount");
            long amountInRs = amount / 100;

            JSONObject notes = paymentDetails.getJSONObject("notes");

            String paymentType = notes.optString("type");

            if( !status.equalsIgnoreCase("captured") ) {
                return false;
            }

            if( paymentType.equalsIgnoreCase(PaymentType.MEMBERSHIP.toString() ) ) {
                String planCode = notes.optString("plan");
                SubscriptionPlan subscriptionPlan = subscriptionPlanService.getSubscriptionByCode(planCode);
                return amountInRs == subscriptionPlan.getPrice().longValue();
            }
            else if ( paymentType.equalsIgnoreCase( PaymentType.FINE.toString() ) ) {
                // TODO - Fine
                //return amountInRs == fine.getPrice().longValue();
                return true;
            }

            return false;
        } catch (Exception e) {
            return false;
        }
    }

}
