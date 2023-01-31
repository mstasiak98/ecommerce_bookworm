package com.bookworm.ecommerce.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "address")
@Getter
@Setter
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "country")
    private String country;

    @Column(name = "street")
    private String street;

    @Column(name = "zipCode")
    private String zipCode;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @OneToOne
    @PrimaryKeyJoinColumn
    @JsonBackReference
    private Order order;

    public Address(Address oldAddress) {
        this.city = oldAddress.getCity();
        this.country = oldAddress.getCountry();
        this.state = oldAddress.getState();
        this.street = oldAddress.getStreet();
        this.zipCode = oldAddress.getZipCode();
    }

    public Address() {

    }
}