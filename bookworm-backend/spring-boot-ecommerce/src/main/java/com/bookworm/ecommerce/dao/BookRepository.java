package com.bookworm.ecommerce.dao;

import com.bookworm.ecommerce.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin("http://localhost:4200")
@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    Page<Book> findByCategoryIdAndFormatsPriceBetween(@Param("id") Long id, Long startPrice, Long endPrice, Pageable pageable);

    @Query(value = "SELECT b FROM Book b JOIN b.formats f WHERE f.format.id = :id and f.price between :startPrice and :endPrice")
    Page<Book> findByFormatAndPriceBetween(@Param(value = "id") Long id, @Param(value = "startPrice") Long startPrice, @Param(value = "endPrice") Long endPrice, Pageable pageable);

    Page<Book> findByAuthorContainingIgnoreCaseAndFormatsPriceBetween (@Param("author") String author, Long startPrice, Long endPrice, Pageable pageable);
    Page<Book> findAllByFormatsPriceBetween(Pageable pageable, Long startPrice, Long endPrice);


    Page<Book> findByNameContainingIgnoreCase(@Param("title") String title, Pageable pageable);
    Optional<Book> findById(@Param("id") Long id);

    @Query(value = "SELECT DISTINCT author, count(*) as bookCount FROM book where deleted = 0  GROUP BY author ORDER BY author", nativeQuery = true)
    List<Map<String, Long>> findBookAuthors();


}
