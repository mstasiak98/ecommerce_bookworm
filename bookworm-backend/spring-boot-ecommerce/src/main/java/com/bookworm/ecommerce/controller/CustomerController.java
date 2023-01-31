package com.bookworm.ecommerce.controller;

import com.bookworm.ecommerce.dto.AddressDto;
import com.bookworm.ecommerce.dto.CustomerDto;
import com.bookworm.ecommerce.entity.Address;
import com.bookworm.ecommerce.entity.Customer;
import com.bookworm.ecommerce.service.CustomerService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin("http://localhost:4200")
public class CustomerController {

    @Autowired
    ModelMapper modelMapper;
    @Autowired
    CustomerService customerService;


    @PutMapping("/{id}/edit")
    public CustomerDto editCustomer(@PathVariable Long id, @Valid @RequestBody CustomerDto customerDto) {
        Customer newCustomer = this.convertToEntity(customerDto);
        return this.convertToDto(this.customerService.editCustomer(id, newCustomer));
    }

    private Customer convertToEntity(CustomerDto customerDto) {
        return modelMapper.map(customerDto, Customer.class);
    }

    private CustomerDto convertToDto(Customer customer) {
        return modelMapper.map(customer, CustomerDto.class);
    }
}
