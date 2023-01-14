package com.bookworm.ecommerce.dao;

import com.bookworm.ecommerce.entity.Format;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource(collectionResourceRel = "bookFormat", path = "book-format")
@CrossOrigin("http://localhost:4200")
public interface BookFormatRepository extends JpaRepository<Format, Long> {
}

