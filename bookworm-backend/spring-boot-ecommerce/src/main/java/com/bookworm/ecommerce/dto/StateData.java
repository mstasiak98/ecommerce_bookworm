package com.bookworm.ecommerce.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class StateData {

    @NotNull
    @NotEmpty
    String name;
    @NotNull
    @NotEmpty
    Long countryId;
}
