package com.bookworm.ecommerce.dao;

import com.bookworm.ecommerce.entity.ERole;
import com.bookworm.ecommerce.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
