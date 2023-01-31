package com.bookworm.ecommerce.service;

import com.bookworm.ecommerce.dao.BookCategoryRepository;
import com.bookworm.ecommerce.dto.CategoryData;
import com.bookworm.ecommerce.entity.BookCategory;
import com.bookworm.ecommerce.entity.State;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    BookCategoryRepository bookCategoryRepository;

    public List<BookCategory> getAllCategories() {
        return bookCategoryRepository.findAll();
    }

    public ResponseEntity<BookCategory>addCategory(CategoryData categoryData) {
        try {
            if(bookCategoryRepository.findByCategoryNameEqualsIgnoreCase(categoryData.getName()).isEmpty()) {
                BookCategory newCategory = bookCategoryRepository.save(new BookCategory(categoryData.getName()));
                return new ResponseEntity<>(newCategory, HttpStatus.CREATED);
            }
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<BookCategory>editCategory(Long id, CategoryData categoryData) {
        try {
            Optional<BookCategory> bookCategoryData = bookCategoryRepository.findById(id);
            if(bookCategoryData.isPresent()){
                BookCategory bookCategory = bookCategoryData.get();
                bookCategory.setCategoryName(categoryData.getName());
                bookCategoryRepository.save(bookCategory);
                return new ResponseEntity<>(bookCategory, HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public Boolean removeCategory(Long id) {
        try {
            Optional<BookCategory> bookCategoryData = bookCategoryRepository.findByIdExcludeBookRelation(id);
            System.out.println(bookCategoryData.isPresent());
            System.out.println(bookCategoryData.get().getCategoryName());
            if(bookCategoryData.isPresent()) {
                bookCategoryRepository.deleteById(bookCategoryData.get().getId());
                return true;
            }
            return false;

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
    }

    public BookCategory findById(Long id) {
        Optional<BookCategory> bookCategoryData = bookCategoryRepository.findById(id);
        return bookCategoryData.orElse(null);
    }

}
