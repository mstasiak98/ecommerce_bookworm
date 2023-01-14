package com.bookworm.ecommerce.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "country")
@Getter
@Setter
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name="code")
    private String code;
    @Column(name="name")
    private String name;

    @OneToMany(mappedBy = "country", fetch = FetchType.EAGER)
    @JsonManagedReference
    private Set<State> states;
}
