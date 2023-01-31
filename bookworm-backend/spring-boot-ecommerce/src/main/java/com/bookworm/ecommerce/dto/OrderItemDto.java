package com.bookworm.ecommerce.dto;

import lombok.Data;

import java.math.BigDecimal;


@Data
public class OrderItemDto {

    private Long id;
    private int quantity;
    private BigDecimal unitPrice;
    private String formatName;
    private Long bookId;
    private BookDto book;
    private String imageUrl;

}
