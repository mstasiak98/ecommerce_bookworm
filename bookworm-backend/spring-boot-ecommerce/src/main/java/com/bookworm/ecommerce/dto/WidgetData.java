package com.bookworm.ecommerce.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class WidgetData {

    private int totalOrders;
    private int newCustomers;
    private int booksSold;
    private BigDecimal totalEarnings;

    public WidgetData(){}

    public WidgetData(int totalOrders, int newCustomers, int booksSold, BigDecimal totalEarnings) {
        this.totalEarnings = totalEarnings;
        this.totalOrders = totalOrders;
        this.newCustomers = newCustomers;
        this.booksSold = booksSold;
    }

}
