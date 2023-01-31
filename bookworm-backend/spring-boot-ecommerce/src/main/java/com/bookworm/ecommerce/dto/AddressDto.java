package com.bookworm.ecommerce.dto;


import lombok.Data;

@Data
public class AddressDto {

    private Long id;
    private String country;
    private String state;
    private String zipCode;
    private String street;
    private String city;

}
