package com.bookworm.ecommerce.service;

import com.bookworm.ecommerce.dao.BookRepository;
import com.bookworm.ecommerce.entity.Author;
import com.bookworm.ecommerce.entity.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class BookService {

    @Autowired
    BookRepository bookRepository;


    public Page<Book> getAllBooks(Pageable pageable, Long startPrice, Long endPrice) {
        return this.bookRepository.findAllByUnitPriceBetween(pageable, startPrice, endPrice);
    }

    public Page<Book> getBooksByCategory(Long id, Long startPrice, Long endPrice, Pageable pageable) {
        return this.bookRepository.findByCategoryIdAndUnitPriceBetween(id, startPrice, endPrice, pageable);
    }

    public Page<Book> getBooksByFormat(Long id, Long startPrice, Long endPrice, Pageable pageable) {
        return this.bookRepository.findByFormatIdAndUnitPriceBetween(id, startPrice, endPrice, pageable);
    }

    public Page<Book> getBooksByAuthorName(String name, Long startPrice, Long endPrice, Pageable pageable) {
        return this.bookRepository.findByAuthorContainingIgnoreCaseAndUnitPriceBetween(name, startPrice, endPrice, pageable);
    }

    public Page<Book> getBooksByTitle(String title, Pageable pageable) {
        return this.bookRepository.findByNameContainingIgnoreCase(title, pageable);
    }

    public List<Map<String, Long>> getBookAuthors() {
        return this.bookRepository.findBookAuthors();
    }

    public Optional<Book> getBookDetails(Long id) {
        return this.bookRepository.findById(id);
    }

}
