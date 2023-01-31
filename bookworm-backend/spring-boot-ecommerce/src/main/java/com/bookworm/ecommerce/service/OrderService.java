package com.bookworm.ecommerce.service;

import com.bookworm.ecommerce.dao.OrderRepository;
import com.bookworm.ecommerce.dao.OrdersStats;
import com.bookworm.ecommerce.dto.AddressDto;
import com.bookworm.ecommerce.dto.ResponseMessage;
import com.bookworm.ecommerce.dto.StatusDto;
import com.bookworm.ecommerce.entity.Address;
import com.bookworm.ecommerce.entity.Order;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class OrderService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    AddressService addressService;

    public List<Order> getAllOrders(boolean archieve) {
        int[] statuses;
        if(archieve) {
            statuses = new int[]{2, 3};
        }else {
            statuses = new int[]{0, 1};
        }
        return orderRepository.findAllByStatusIn(statuses);
    }

    public Order getOrderById(Long id) {
        Optional<Order> orderData = orderRepository.findById(id);
        return orderData.orElse(null);
    }

    public Boolean changeStatus(Long id, StatusDto status) {
        Optional<Order> orderData = orderRepository.findById(id);
        if(orderData.isPresent()) {
            Order order = orderData.get();
            order.setStatus(status.getStatus());
            orderRepository.save(order);
            return true;
        } else {
            return false;
        }
    }

    @Transactional
    public ResponseMessage removeOrder(Long id) {
        try {
            Order order = this.getOrderById(id);
            if(order != null){
                this.orderRepository.deleteById(id);
                this.addressService.removeAddressByOrderId(id);
                return new ResponseMessage(true);
            }else {
                return new ResponseMessage("Order not found", false);
            }
        } catch (Exception e) {
            return new ResponseMessage(e.getMessage(), false);
        }
    }

    public List<Order> getOrdersByDateBetween(Date start, Date end) {
        return this.orderRepository.findAllByDateCreatedBetween(start, end);
    }

    public List<Map<String, Integer>> getTopSellingCategories() {
        return this.orderRepository.getTop3SellingCategories();
    }

    public List<OrdersStats> getMonthlyOrdersCount() {
        List<OrdersStats> fullReport = new ArrayList<>(12);
        for(int i = 0; i <= 11; i++) {
            fullReport.add(new OrdersStats() {
                @Override
                public int getMonth() {
                    return 0;
                }
                @Override
                public int getOrders() {
                    return 0;
                }
            });
        }
        List<OrdersStats> report = this.orderRepository.getMonthlyOrdersCount();
        for(int i = 0; i <= 11; i++) {
            for(OrdersStats ordersStats : report) {
                if(ordersStats.getMonth() == i + 1) {
                    fullReport.set(i, ordersStats);
                }
            }
        }
        return fullReport;
    }

}
