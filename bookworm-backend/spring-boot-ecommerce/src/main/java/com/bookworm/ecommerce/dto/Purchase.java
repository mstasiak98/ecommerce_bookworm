package com.bookworm.ecommerce.dto;


import com.bookworm.ecommerce.entity.Address;
import com.bookworm.ecommerce.entity.Customer;
import com.bookworm.ecommerce.entity.Order;
import com.bookworm.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {
    private Customer customer;
    private Address billingAddress;
    private Address shippingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
