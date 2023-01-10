package com.bookworm.ecommerce.controller;


import com.bookworm.ecommerce.entity.Author;
import com.bookworm.ecommerce.entity.Book;
import com.bookworm.ecommerce.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
@CrossOrigin("http://localhost:4200")
public class BookController {

    @Autowired
    BookService bookService;


    @GetMapping("")
    public Page<Book> getAllBooks(Pageable pageable, @RequestParam(name = "startPrice") Long startPrice, @RequestParam(name = "endPrice") Long endPrice) {
        return this.bookService.getAllBooks(pageable, startPrice, endPrice);
    }

    @GetMapping("/findByCategory")
    public Page<Book> getBooksByCategory(@RequestParam(name = "id") Long id, @RequestParam(name = "startPrice") Long startPrice, @RequestParam(name = "endPrice") Long endPrice, Pageable pageable) {
        return this.bookService.getBooksByCategory(id, startPrice, endPrice, pageable);
    }

    @GetMapping("/findByFormat")
    public Page<Book> getBooksByFormat(@RequestParam(name = "id") Long id, @RequestParam(name = "startPrice") Long startPrice, @RequestParam(name = "endPrice") Long endPrice, Pageable pageable) {
        return this.bookService.getBooksByFormat(id, startPrice, endPrice, pageable);
    }

    @GetMapping("/findByAuthorName")
    public Page<Book> getBooksByAuthorName(@RequestParam(name = "author") String name, @RequestParam(name = "startPrice") Long startPrice, @RequestParam(name = "endPrice") Long endPrice, Pageable pageable) {
        return this.bookService.getBooksByAuthorName(name, startPrice, endPrice, pageable);
    }

    @GetMapping("/findByTitle")
    public Page<Book> getBooksByAuthorName(@RequestParam(name = "title") String title, Pageable pageable) {
        return this.bookService.getBooksByTitle(title, pageable);
    }

    @GetMapping("/getAuthors")
    public ResponseEntity<List<Map<String, Long>>> getBookAuthors() {
        List<Map<String, Long>> authors = this.bookService.getBookAuthors();
        return ResponseEntity.ok(authors);
    }

    @GetMapping("/bookDetails")
    public Optional<Book> getBookDetails(@RequestParam(name = "id") Long id) {
        return this.bookService.getBookDetails(id);
    }

}
