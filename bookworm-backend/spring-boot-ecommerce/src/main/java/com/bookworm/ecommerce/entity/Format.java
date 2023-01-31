package com.bookworm.ecommerce.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "format")
//@Data - bug
public class Format {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "format_name")
    private String formatName;
/*    @OneToMany(cascade = CascadeType.ALL, mappedBy = "format", fetch = FetchType.EAGER)
    @JsonBackReference
    private Set<Book> books;*/


    @OneToMany(mappedBy = "format", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonBackReference
    Set<BookFormat> formats;


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

    public String getFormatName() {
        return formatName;
    }

    public void setFormatName(String formatName) {
        this.formatName = formatName;
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
        if (!(o instanceof Format)) return false;
        return id != null && id.equals(((Format)o).id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }


}
