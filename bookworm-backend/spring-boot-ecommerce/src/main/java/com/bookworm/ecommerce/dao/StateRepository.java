package com.bookworm.ecommerce.dao;

import com.bookworm.ecommerce.entity.Country;
import com.bookworm.ecommerce.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StateRepository extends JpaRepository<State, Long> {
    public Optional<State> findByName(String name);
    public void deleteAllByCountry_Id(Long id);

    public Boolean existsStateByName(String name);

}
