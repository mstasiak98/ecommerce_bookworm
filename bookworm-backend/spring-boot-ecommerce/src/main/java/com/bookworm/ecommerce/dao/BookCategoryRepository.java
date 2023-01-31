package com.bookworm.ecommerce.dao;

import com.bookworm.ecommerce.entity.BookCategory;
import jdk.jfr.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;

@RepositoryRestResource(collectionResourceRel = "bookCategory", path = "book-category")
@CrossOrigin("http://localhost:4200")
public interface BookCategoryRepository extends JpaRepository<BookCategory, Long> {

    Optional<BookCategory> findByCategoryNameEqualsIgnoreCase(String name);


    @Query(value = "SELECT * from category where id = :id", nativeQuery = true)
    Optional<BookCategory> findByIdExcludeBookRelation(@Param("id") Long id);
}
