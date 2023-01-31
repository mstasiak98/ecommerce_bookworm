package com.bookworm.ecommerce.dto;


import com.bookworm.ecommerce.entity.BookFormatKey;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class BookFormatData {

    private BookFormatKey id;
    private int quantity;
    private double price;

}
