package com.bookworm.ecommerce.dto;

import com.bookworm.ecommerce.entity.OrderItem;
import lombok.Data;
import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;

@Data
public class OrderDto {

    private Long id;
    private String orderTrackingNumber;
    private int totalQuantity;
    private BigDecimal totalPrice;
    private int status;
    private Date dateCreated;
    private Date lastUpdated;

    private Set<OrderItemDto> orderItems;
    private CustomerDto customer;
    private AddressDto billingAddress;
    private AddressDto shippingAddress;

}