package com.bookworm.ecommerce.dto;

import com.bookworm.ecommerce.entity.State;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
public class CountryData {

    String name;
    String code;
    private Set<String> states;

}
