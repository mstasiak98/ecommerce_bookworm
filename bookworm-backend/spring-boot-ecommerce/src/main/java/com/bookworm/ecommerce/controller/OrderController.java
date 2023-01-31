package com.bookworm.ecommerce.controller;


import com.bookworm.ecommerce.dao.OrdersStats;
import com.bookworm.ecommerce.dto.*;
import com.bookworm.ecommerce.entity.Address;
import com.bookworm.ecommerce.entity.Book;
import com.bookworm.ecommerce.entity.Order;
import com.bookworm.ecommerce.service.BookService;
import com.bookworm.ecommerce.service.OrderService;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.validation.constraints.NotNull;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin("http://localhost:4200")
public class OrderController {

    @Autowired
    OrderService orderService;
    @Autowired
    BookService bookService;
    @Autowired
    ModelMapper modelMapper;


    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping(value = "/monthly")
    public List<OrdersStats> getMonthlyOrders() {
        return orderService.getMonthlyOrdersCount();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping(value = "/top-categories")
    public List<Map<String, Integer>> getTopCategories() {
        return orderService.getTopSellingCategories();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping(value = "/all")
    public List<OrderDto> getAllOrders(@RequestParam(value = "archive") boolean isArchived) {
        List<Order> orders = this.orderService.getAllOrders(isArchived);
        return orders.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping(value = "/{id}")
    public ResponseEntity<OrderDto> getOrder(@NotNull @PathVariable Long id) {
        Order order = this.orderService.getOrderById(id);
        if(order != null) {
            OrderDto orderDto = this.convertToDtoWithBooks(order);
            return new ResponseEntity<>(orderDto, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping(value = "/{id}/change-status")
    public ResponseEntity<ResponseMessage> changeOrderStatus(@PathVariable Long id, @RequestBody StatusDto status) {
        Boolean result = this.orderService.changeStatus(id, status);
        return new ResponseEntity<>(new ResponseMessage(result), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping(value = "/{id}/remove")
    public ResponseEntity<ResponseMessage> remove(@NotNull @PathVariable Long id) {
        ResponseMessage result = this.orderService.removeOrder(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    private OrderDto convertToDto(Order order) {
        return modelMapper.map(order, OrderDto.class);
    }

    private OrderDto convertToDtoWithBooks(Order order) {
        OrderDto orderDto = modelMapper.map(order, OrderDto.class);
        orderDto.getOrderItems().forEach(orderItemDto -> {
            Book book = bookService.getBookById(orderItemDto.getBookId());
            orderItemDto.setBook(modelMapper.map(book, BookDto.class));
        });
        return orderDto;
    }

}
