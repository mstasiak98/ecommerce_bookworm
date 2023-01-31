package com.bookworm.ecommerce.entity;

import com.bookworm.ecommerce.dto.BookData;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Table;
import jakarta.validation.Constraint;
import lombok.Data;
import org.hibernate.annotations.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "book")
@SQLDelete(sql = "UPDATE book SET deleted = true WHERE id=?")
@FilterDef(name = "deletedBookFilter", parameters = @ParamDef(name = "isDeleted", type = Boolean.class))
@Filter(name = "deletedBookFilter", condition = "deleted = false or deleted = :isDeleted")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private BookCategory category;

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    @JsonManagedReference
    Set<BookFormat> formats;

    @Column(name = "deleted")
    private boolean deleted = Boolean.FALSE;

    @Column(name = "sku")
    private String sku;
    @Column(name = "name")
    private String name;
    @Column(name = "author")
    private String author;
    @Column(name = "description")
    private String description;
    @Column(name = "page_count")
    private int pageCount;
    @Column(name = "unit_price")
    private BigDecimal unitPrice;
    @Column(name = "image_url")
    private String imageUrl;
    @Column(name = "active")
    private boolean active;
    @Column(name = "units_in_stock")
    private int unitsInStock;
    @Column(name = "date_created")
    @CreationTimestamp
    private Date dateCreated;
    @Column(name = "last_updated")
    @UpdateTimestamp
    private Date lastUpdated;

    public Book(BookData bookData) {
        this.sku = bookData.getSku();
        this.name = bookData.getName();
        this.author = bookData.getAuthor();
        this.description = bookData.getDescription();
        this.pageCount = bookData.getPageCount();
    }
    public Book(BookCategory category, String sku, String name, String author, String description, int pageCount, String imageUrl) {
        this.category = category;
        this.sku = sku;
        this.name = name;
        this.author = author;
        this.description = description;
        this.pageCount = pageCount;
        this.imageUrl = imageUrl;
    }

    public Book() {

    }

    public boolean isDeleted() {
        return deleted;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public Set<BookFormat> getFormats() {
        return formats;
    }

    public void setFormats(Set<BookFormat> formats) {
        this.formats = formats;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BookCategory getCategory() {
        return category;
    }

    public void setCategory(BookCategory category) {
        this.category = category;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getPageCount() {
        return pageCount;
    }

    public void setPageCount(int pageCount) {
        this.pageCount = pageCount;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public int getUnitsInStock() {
        return unitsInStock;
    }

    public void setUnitsInStock(int unitsInStock) {
        this.unitsInStock = unitsInStock;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Date getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(Date lastUpdated) {
        this.lastUpdated = lastUpdated;
    }


    public void addFormat(BookFormat bookFormat) {
        if(bookFormat != null) {
            if(this.formats == null) {
                this.formats = new HashSet<>();
            }
            this.formats.add(bookFormat);
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Book)) return false;
        return id != null && id.equals(((Book)o).id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
