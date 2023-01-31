package com.bookworm.ecommerce.controller;

import com.bookworm.ecommerce.dto.AddressDto;
import com.bookworm.ecommerce.dto.OrderDto;
import com.bookworm.ecommerce.entity.Address;
import com.bookworm.ecommerce.service.AddressService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/address")
@CrossOrigin("http://localhost:4200")
public class AddressController {

    @Autowired
    AddressService addressService;

    @Autowired
    ModelMapper modelMapper;

    @PutMapping("/{id}/change")
    public AddressDto changeAddress(@PathVariable Long id, @RequestBody AddressDto address) {
        Address newAddress = this.convertToEntity(address);
        return modelMapper.map(this.addressService.changeAddress(id, newAddress), AddressDto.class);
    }

    private Address convertToEntity(AddressDto addressDto) {
        return modelMapper.map(addressDto, Address.class);
    }


}
