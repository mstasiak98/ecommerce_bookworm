package com.bookworm.ecommerce.dao;

import com.bookworm.ecommerce.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;

@RepositoryRestResource
public interface OrderRepository extends JpaRepository<Order, Long> {

    @PreAuthorize("isAuthenticated() and #email == authentication.principal.email")
    Page<Order> findByCustomerEmail(@Param("email") String email, Pageable pageable);

}
