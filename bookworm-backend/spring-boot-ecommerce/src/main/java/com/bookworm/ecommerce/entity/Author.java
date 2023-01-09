package com.bookworm.ecommerce.entity;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Author {
    String author;
    Long bookCount;
}
