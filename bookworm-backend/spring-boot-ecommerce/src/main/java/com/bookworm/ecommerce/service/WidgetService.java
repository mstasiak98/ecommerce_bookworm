package com.bookworm.ecommerce.service;


import com.bookworm.ecommerce.dto.WidgetData;
import com.bookworm.ecommerce.entity.Customer;
import com.bookworm.ecommerce.entity.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class WidgetService {

    @Autowired
    OrderService orderService;



    public WidgetData getWidgetData() {
        Date startDate = this.ldtToDate(LocalDateTime.now().minusDays(7));
        Date endDate = this.ldtToDate(LocalDateTime.now());
        List<Order> pastOrders = this.orderService.getOrdersByDateBetween(startDate, endDate);
        int totalOrders = 0;
        BigDecimal totalEarnings = new BigDecimal(0);
        Set<Customer> newCustomers = new HashSet<>();
        int itemsSold = 0;
        int newCustomersNumber;
        for(Order order : pastOrders) {
            totalOrders += 1;
            totalEarnings = totalEarnings.add(order.getTotalPrice());
            newCustomers.add(order.getCustomer());
            itemsSold += order.getTotalQuantity();
        }
        newCustomersNumber = newCustomers.size();

        WidgetData widgetData = new WidgetData(totalOrders, newCustomersNumber, itemsSold , totalEarnings);

        return widgetData;
    }

    private Date ldtToDate(LocalDateTime ldt) {
        return Date.from(ldt.atZone(ZoneId.systemDefault()).toInstant());
    }

}
