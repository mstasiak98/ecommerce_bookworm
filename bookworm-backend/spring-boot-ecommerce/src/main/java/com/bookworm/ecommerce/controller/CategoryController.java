package com.bookworm.ecommerce.controller;

import com.bookworm.ecommerce.dao.BookCategoryRepository;
import com.bookworm.ecommerce.dto.CategoryData;
import com.bookworm.ecommerce.entity.BookCategory;
import com.bookworm.ecommerce.service.CategoryService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/categories")
public class CategoryController  {

    @Autowired
    CategoryService categoryService;

    @GetMapping("/all")
    public List<BookCategory> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @PostMapping("/add")
    public ResponseEntity<BookCategory> addCategory(@RequestBody CategoryData categoryData) {
        return categoryService.addCategory(categoryData);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<BookCategory> editCategory(@PathVariable Long id, @RequestBody CategoryData categoryData) {
        return categoryService.editCategory(id, categoryData);
    }

    @DeleteMapping("/remove/{id}")
    @Transactional
    public ResponseEntity<Boolean> deleteCategory(@PathVariable Long id) {
        Boolean result = categoryService.removeCategory(id);
        HttpStatus status = result ? HttpStatus.NO_CONTENT : HttpStatus.BAD_REQUEST;
        return new ResponseEntity<>(result, status);
    }
}
