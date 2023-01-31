package com.bookworm.ecommerce.service;


import com.bookworm.ecommerce.dao.AddressRepository;
import com.bookworm.ecommerce.entity.Address;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AddressService {

    @Autowired
    AddressRepository addressRepository;


    public Address getAddressById(Long id) {
        Optional<Address> address = this.addressRepository.findById(id);
        return address.orElse(null);
    }


    public Address changeAddress(Long id, Address newAddress) {
        Address oldAddress = this.getAddressById(id);
        if(oldAddress != null) {
            oldAddress.setCity(newAddress.getCity());
            oldAddress.setState(newAddress.getState());
            oldAddress.setCountry(newAddress.getCountry());
            oldAddress.setZipCode(newAddress.getZipCode());
            oldAddress.setStreet(newAddress.getStreet());
            return this.addressRepository.save(oldAddress);
        }
        return null;
    }

    public void removeAddress(Long id) {
        this.addressRepository.deleteById(id);
    }

    public void removeAddressByOrderId(Long orderId) {
        this.addressRepository.deleteAllByOrderId(orderId);
    }


}
