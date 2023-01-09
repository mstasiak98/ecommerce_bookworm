package com.bookworm.ecommerce.dao;

import com.bookworm.ecommerce.entity.Author;
import com.bookworm.ecommerce.entity.Book;
import com.bookworm.ecommerce.entity.BookCategory;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;

@CrossOrigin("http://localhost:4200")
@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    Page<Book> findByCategoryIdAndUnitPriceBetween(@Param("id") Long id, Long startPrice, Long endPrice, Pageable pageable);
    Page<Book> findByFormatIdAndUnitPriceBetween(@Param("id") Long id, Long startPrice, Long endPrice, Pageable pageable);
    Page<Book> findByAuthorContainingIgnoreCaseAndUnitPriceBetween (@Param("author") String author, Long startPrice, Long endPrice, Pageable pageable);
    Page<Book> findAllByUnitPriceBetween(Pageable pageable, Long startPrice, Long endPrice);
    Page<Book> findByNameContainingIgnoreCase(@Param("title") String title, Pageable pageable);

    @Query(value = "SELECT DISTINCT author, count(*) as bookCount FROM book  GROUP BY author ORDER BY author", nativeQuery = true)
    List<Map<String, Long>> findBookAuthors();


}
