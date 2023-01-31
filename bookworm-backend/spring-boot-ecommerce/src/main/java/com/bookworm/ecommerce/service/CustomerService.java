package com.bookworm.ecommerce.service;

import com.bookworm.ecommerce.dao.CustomerRepository;
import com.bookworm.ecommerce.entity.Customer;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    @Autowired
    CustomerRepository customerRepository;


    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id).orElse(null);
    }

    public Customer editCustomer(Long id, Customer newCustomer) {
        Customer oldCustomer = this.getCustomerById(id);
        if(oldCustomer != null) {
            oldCustomer.setEmail(newCustomer.getEmail());
            oldCustomer.setFirstName(newCustomer.getFirstName());
            oldCustomer.setLastName(newCustomer.getLastName());
            return customerRepository.save(oldCustomer);
        }
        return null;
    }

}
