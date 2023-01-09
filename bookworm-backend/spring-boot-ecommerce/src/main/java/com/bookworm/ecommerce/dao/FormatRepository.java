package com.bookworm.ecommerce.dao;

import com.bookworm.ecommerce.entity.Book;
import com.bookworm.ecommerce.entity.BookFormat;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(collectionResourceRel = "bookFormat", path = "book-format")
@CrossOrigin("http://localhost:4200")
public interface FormatRepository extends JpaRepository<BookFormat, Long> {
}

