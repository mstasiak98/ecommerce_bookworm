package com.bookworm.ecommerce.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class BookFormatKey implements Serializable  {

    @Column(name = "book_id")
    Long bookId;

    @Column(name = "format_id")
    Long formatId;

    public BookFormatKey(Long bookId, Long formatId) {
        super();
        this.bookId = bookId;
        this.formatId = formatId;
    }

    public BookFormatKey() {

    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    public Long getFormatId() {
        return formatId;
    }

    public void setFormatId(Long formatId) {
        this.formatId = formatId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof BookFormatKey)) return false;
        return bookId != null && bookId.equals(((BookFormatKey)o).bookId) && formatId != null && formatId.equals(((BookFormatKey)o).formatId);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}
