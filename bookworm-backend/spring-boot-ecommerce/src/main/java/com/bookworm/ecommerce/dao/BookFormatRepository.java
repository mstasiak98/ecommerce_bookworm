package com.bookworm.ecommerce.dao;

import com.bookworm.ecommerce.entity.Book;
import com.bookworm.ecommerce.entity.BookFormat;
import com.bookworm.ecommerce.entity.BookFormatKey;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface BookFormatRepository extends JpaRepository<BookFormat, BookFormatKey> {

    public Set<BookFormat> findByBook(Book book);


    @Modifying
    @Transactional
    @Query(value = "DELETE from book_format where book_id = :bookId", nativeQuery = true)
    public void deleAllByBookId(@Param(value = "bookId") @NotNull Long bookId);
}
