package com.bookworm.ecommerce.controller;


import com.bookworm.ecommerce.dto.BookFormatData;
import com.bookworm.ecommerce.entity.Book;
import com.bookworm.ecommerce.entity.BookFormat;
import com.bookworm.ecommerce.entity.BookFormatKey;
import com.bookworm.ecommerce.service.BookService;
import com.bookworm.ecommerce.service.FileStorageService;
import jakarta.annotation.Nullable;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
@CrossOrigin("http://localhost:4200")
public class BookController {

    @Autowired
    BookService bookService;

    @Autowired
    FileStorageService fileStorageService;


    @PutMapping(value ="/book/set-format-params")
    public ResponseEntity<BookFormat> setBookFormatParameters(@RequestBody BookFormatData bookFormatData) {
        try {
            BookFormat result = this.bookService.setBookFormatParameters(bookFormatData);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = "/change-cover/{id}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_OCTET_STREAM_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Map<String, String>> changeCover(@PathVariable Long id, @RequestParam(value = "file", required = true) MultipartFile file) {
        String newUrl = this.bookService.changeCover(id, file);
        if(newUrl!= null && !newUrl.isBlank()) {
            return new ResponseEntity<>(Collections.singletonMap("response", newUrl), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(value = "/add", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_OCTET_STREAM_VALUE}, produces = {"application/json"})
    public ResponseEntity<Book> addBook(@RequestParam(value = "data") String data, @RequestParam(value = "file", required = false) @Nullable MultipartFile file) {
        Book result = bookService.addBook(data, file);
        if(result != null) {
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = "/edit/{id}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE, MediaType.APPLICATION_OCTET_STREAM_VALUE}, produces = {"application/json"})
    public ResponseEntity<Book> editBook(@PathVariable Long id, @RequestParam(value = "data") String data) {
        Book result = bookService.editBook(id, data);
        if(result != null) {
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(value = "/remove/{id}")
    @Transactional
    public ResponseEntity<Boolean> removeBook(@PathVariable Long id) {
        Boolean result = bookService.removeBook(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @DeleteMapping(value = "/restore/{id}")
    @Transactional
    public ResponseEntity<Boolean> restoreBook(@PathVariable Long id) {
        Boolean result = bookService.restoreBook(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/all")
    public List<Book> getAllBooks(@RequestParam(value = "isDeleted", required = false, defaultValue = "false") boolean isDeleted) {
        return this.bookService.getAllBooks(isDeleted);
    }

    @GetMapping("")
    public Page<Book> getBooks(Pageable pageable, @RequestParam(name = "startPrice") Long startPrice, @RequestParam(name = "endPrice") Long endPrice) {
        return this.bookService.getBooks(pageable, startPrice, endPrice);
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
