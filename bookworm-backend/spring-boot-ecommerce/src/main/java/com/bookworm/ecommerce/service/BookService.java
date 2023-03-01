package com.bookworm.ecommerce.service;

import com.bookworm.ecommerce.controller.FileController;
import com.bookworm.ecommerce.dao.BookFormatRepository;
import com.bookworm.ecommerce.dao.BookRepository;
import com.bookworm.ecommerce.dto.BookData;
import com.bookworm.ecommerce.dto.BookFormatData;
import com.bookworm.ecommerce.entity.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.hibernate.Filter;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class BookService {

    @Autowired
    BookRepository bookRepository;

    @Autowired
    FileStorageService storageService;
    @Autowired
    CategoryService categoryService;

    @Autowired
    FormatService formatService;

    @Autowired
    BookFormatRepository bookFormatRepository;
    @Autowired
    private EntityManager entityManager;


    public List<Book> getAllBooks(boolean isDeleted) {
        return findAllFilter(isDeleted);
    }

    public List<Book> findAllFilter(boolean isDeleted) {
        Session session = entityManager.unwrap(Session.class);
        Filter filter = session.enableFilter("deletedBookFilter");
        filter.setParameter("isDeleted", isDeleted);
        List<Book> books = bookRepository.findAll();
        session.disableFilter("deletedBookFilter");
        return books;
    }

    public Page<Book> getBooks(Pageable pageable, Long startPrice, Long endPrice) {
        return this.bookRepository.findAllByFormatsPriceBetween(pageable, startPrice, endPrice);
    }

    public Page<Book> getBooksByCategory(Long id, Long startPrice, Long endPrice, Pageable pageable) {
        return this.bookRepository.findByCategoryIdAndFormatsPriceBetween(id, startPrice, endPrice, pageable);
    }

    public Page<Book> getBooksByFormat(Long id, Long startPrice, Long endPrice, Pageable pageable) {
        return this.bookRepository.findByFormatAndPriceBetween(id, startPrice, endPrice, pageable);
    }

    public Book getBookById(Long id) {
        Optional<Book> bookData = this.bookRepository.findById(id);
        return bookData.orElse(null);
    }

    public Page<Book> getBooksByAuthorName(String name, Long startPrice, Long endPrice, Pageable pageable) {
        return this.bookRepository.findByAuthorContainingIgnoreCaseAndFormatsPriceBetween(name, startPrice, endPrice, pageable);
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

    @Transactional
    public Book addBook(String data, MultipartFile file) {
        ObjectMapper om = new ObjectMapper();
        try {
            BookData bookData = om.readValue(data, BookData.class);
            String filename="";
            if(file != null) {
                storageService.save(file);
                filename = file.getOriginalFilename();
            }else {
                filename = "placeholder.png";
            }

            String url = MvcUriComponentsBuilder
                    .fromMethodName(FileController.class, "getFile", filename).build().toString();

            System.out.println(bookData.getCategoryId());

            BookCategory bookCategory = categoryService.findById(bookData.getCategoryId());
            System.out.println(bookCategory.getCategoryName());
            List<Format> bookFormats = formatService.findByIds(bookData.getFormatIds());

            Book book = new Book(bookData);
            book.setImageUrl(url);
            book.setCategory(bookCategory);

            Book savedBook = bookRepository.save(book);
            handleBookFormats(bookFormats, savedBook, false);
            return savedBook;
        } catch (IOException e) {
            this.storageService.removeFile(file.getOriginalFilename());
            return null;
        }
    }

    @Transactional
    public Book editBook(Long id, String data) {
        ObjectMapper om = new ObjectMapper();
        try {
            BookData bookData = om.readValue(data, BookData.class);

            Optional<Book> bookExiData = bookRepository.findById(id);
            if(bookExiData.isEmpty()) return null;

            Book existingBook = bookExiData.get();

            BookCategory bookCategory = categoryService.findById(bookData.getCategoryId());
            List<Format> bookFormats = formatService.findByIds(bookData.getFormatIds());

            List<BookFormat> exiBookFormats = existingBook.getFormats().stream().toList();

            exiBookFormats.forEach(exiFormat -> {
                if(!(bookFormats.stream().map(Format::getFormatName).toList().contains(exiFormat.getFormat().getFormatName()))) {
                    bookFormatRepository.deleteById(exiFormat.getId());
                    existingBook.getFormats().remove(exiFormat);
                }
            });

            existingBook.setSku(bookData.getSku());
            existingBook.setName(bookData.getName());
            existingBook.setAuthor(bookData.getAuthor());
            existingBook.setDescription(bookData.getDescription());
            existingBook.setPageCount(bookData.getPageCount());
            existingBook.setCategory(bookCategory);

            Book editedBook = bookRepository.save(existingBook);
            handleBookFormats(bookFormats, editedBook, true);
            return editedBook;

        } catch (Exception e) {
            return null;
        }
    }

    private void handleBookFormats(List<Format> bookFormats, Book newBook, boolean isEdit) {
        bookFormats.forEach(newFormat -> {
            BookFormatKey bfid = new BookFormatKey(newBook.getId(), newFormat.getId());
            BookFormat bookFormat = new BookFormat(bfid);
            if(isEdit && newBook.getFormats().contains(bookFormat)) {
                return;
            }

            bookFormat.setFormat(newFormat);
            bookFormat.setBook(newBook);
            BookFormat savedBookFormat = bookFormatRepository.save(bookFormat);
            newBook.addFormat(savedBookFormat);
            newFormat.addFormat(savedBookFormat);
        });
    }

    public String changeCover(Long id, MultipartFile file) {
        try {
            Optional<Book> bookData = bookRepository.findById(id);
            if(bookData.isPresent()){
                Book book = bookData.get();
                String fileName = this.getFilenameFromUrl(book.getImageUrl());
                if(!fileName.equals("placeholder.png")) {
                    storageService.removeFile(fileName);
                }
                storageService.save(file);
                String newUrl = MvcUriComponentsBuilder
                        .fromMethodName(FileController.class, "getFile", file.getOriginalFilename()).build().toString();
                book.setImageUrl(newUrl);
                bookRepository.save(book);

                return newUrl;
            }else {
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }

    public Boolean removeBook(Long id) {
        try {
            Optional<Book> bookData = bookRepository.findById(id);
            if(bookData.isPresent()) {
                Book book = bookData.get();
                book.setDeleted(true);
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }

    public Boolean restoreBook(Long id) {
        try {
            Optional<Book> bookData = bookRepository.findById(id);
            if(bookData.isPresent()) {
                Book book = bookData.get();
                book.setDeleted(false);
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }

    public BookFormat setBookFormatParameters(BookFormatData bookFormatData) {
        Optional<BookFormat> bfData = bookFormatRepository.findById(bookFormatData.getId());
        if(bfData.isPresent()) {
            BookFormat bookFormat = bfData.get();
            bookFormat.setPrice(bookFormatData.getPrice());
            bookFormat.setQuantity(bookFormatData.getQuantity());
            bookFormatRepository.save(bookFormat);
            return bookFormat;
        }else {
            return null;
        }
    }

    private String getFilenameFromUrl(String url) {
        return url.substring(url.lastIndexOf('/') + 1);
    }

}
