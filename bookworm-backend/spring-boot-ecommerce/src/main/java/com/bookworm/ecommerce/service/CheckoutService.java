package com.bookworm.ecommerce.service;

import com.bookworm.ecommerce.dao.CustomerRepository;
import com.bookworm.ecommerce.dto.Purchase;
import com.bookworm.ecommerce.dto.PurchaseResponse;
import com.bookworm.ecommerce.entity.Customer;
import com.bookworm.ecommerce.entity.Order;
import com.bookworm.ecommerce.entity.OrderItem;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutService {
    private CustomerRepository customerRepository;

    public CheckoutService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
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

}
