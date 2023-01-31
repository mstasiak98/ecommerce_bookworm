package com.bookworm.ecommerce.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "country")
@Getter
@Setter
public class Country {


    public Country() {}
    public Country(String code, String name) {
        this.code = code;
        this.name = name;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name="code")
    private String code;
    @Column(name="name")
    private String name;

    @OneToMany(mappedBy = "country", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<State> states = new HashSet<>();

    public void add(State state) {
        if(state != null) {
            if(this.states == null) {
                this.states = new HashSet<>();
            }
            this.states.add(state);
            state.setCountry(this);
        }
    }
}
