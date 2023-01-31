package com.bookworm.ecommerce.dto;
import com.bookworm.ecommerce.entity.BookCategory;
import com.bookworm.ecommerce.entity.BookFormat;
import lombok.Data;
import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;


@Data
public class BookDto {

    private Long id;
    private BookCategory category;
    private Set<BookFormat> formats;
    private boolean deleted;
    private String sku;
    private String name;
    private String author;
    private String description;
    private int pageCount;
    private BigDecimal unitPrice;
    private String imageUrl;
    private boolean active;
    private int unitsInStock;
    private Date dateCreated;
    private Date lastUpdated;
}
