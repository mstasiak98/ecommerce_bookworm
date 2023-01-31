package com.bookworm.ecommerce.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.io.Serializable;

@Entity
public class BookFormat {

    @EmbeddedId
    private BookFormatKey id;
    @ManyToOne
    @MapsId("bookId")
    @JoinColumn(name = "book_id")
    @JsonBackReference
    Book book;
    @ManyToOne
    @MapsId("formatId")
    @JoinColumn(name = "format_id")
    @JsonManagedReference
    Format format;


    @PreRemove
    private void removeBookFormat() {
        this.getBook().formats.remove(this);
        this.getFormat().formats.remove(this);
    }


    double price;
    int quantity;

    public BookFormat(BookFormatKey id) {
        this.id = id;
    }

    public BookFormat(BookFormatKey id, double price, int quantity) {
        this.id = id;
        this.price = price;
        this.quantity = quantity;
    }

    public BookFormat() {

    }

    public BookFormatKey getId() {
        return id;
    }

    public void setId(BookFormatKey id) {
        this.id = id;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public Format getFormat() {
        return format;
    }

    public void setFormat(Format format) {
        this.format = format;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof BookFormat)) return false;
        return id != null && id.equals(((BookFormat)o).id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
