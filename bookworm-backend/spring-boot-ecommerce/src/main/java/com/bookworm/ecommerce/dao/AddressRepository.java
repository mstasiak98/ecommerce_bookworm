package com.bookworm.ecommerce.dao;

import com.bookworm.ecommerce.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

    public void deleteAllByOrderId(@Param(value = "id") Long id);

}
