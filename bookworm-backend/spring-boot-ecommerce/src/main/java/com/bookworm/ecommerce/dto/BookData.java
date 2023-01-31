package com.bookworm.ecommerce.dto;

import jakarta.annotation.Nullable;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class BookData {
    String sku;
    String name;
    String author;
    String description;
    int pageCount;
    Long categoryId;
    List<Long> formatIds;
    @Nullable
    FileInfo file;

}
