package com.bookworm.ecommerce.dto;


import lombok.Data;

@Data
public class ResponseMessage {
    String message;
    Object body;

    public ResponseMessage(Object obj) {
        this.body = obj;
    }

    public ResponseMessage(String message, Object obj) {
        this.message = message;
        this.body = obj;
    }
}
