package com.bookworm.ecommerce.service;

import com.bookworm.ecommerce.dao.CustomerRepository;
import com.bookworm.ecommerce.dto.PaymentInfo;
import com.bookworm.ecommerce.dto.Purchase;
import com.bookworm.ecommerce.dto.PurchaseResponse;
import com.bookworm.ecommerce.entity.Customer;
import com.bookworm.ecommerce.entity.Order;
import com.bookworm.ecommerce.entity.OrderItem;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CheckoutService {
    private CustomerRepository customerRepository;

    public CheckoutService(CustomerRepository customerRepository, @Value("${stripe.key.secret}") String secretKey) {
        this.customerRepository = customerRepository;
        Stripe.apiKey = secretKey;
    }

    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        Order order = purchase.getOrder();
        String trackingNumber = generateTrackingNumber();
        order.setOrderTrackingNumber(trackingNumber);

        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));

        order.setShippingAddress(purchase.getShippingAddress());
        order.setBillingAddress(purchase.getBillingAddress());

        Customer customer = purchase.getCustomer();
        String customerEmail = customer.getEmail();

        Customer exisitingCustomer = customerRepository.findByEmail(customerEmail);

        if(exisitingCustomer != null) {
            customer = exisitingCustomer;
        }

        customer.add(order);

        customerRepository.save(customer);

        return new PurchaseResponse(trackingNumber);
    }

    private String generateTrackingNumber() {
        return UUID.randomUUID().toString();
    }

    public PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException {
        List<String> paymentMethods = new ArrayList<>();
        paymentMethods.add("card");

        Map<String, Object> params = new HashMap<>();
        params.put("amount", paymentInfo.getAmount());
        params.put("currency", paymentInfo.getCurrency());
        params.put("payment_method_types", paymentMethods);
        params.put("description", "Bookworm purchase");
        params.put("receipt_email", paymentInfo.getReceiptEmail());

        return PaymentIntent.create(params);
    }

}
