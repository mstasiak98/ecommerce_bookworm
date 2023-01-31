package com.bookworm.ecommerce.controller;
import com.bookworm.ecommerce.dao.CountryRepository;
import com.bookworm.ecommerce.dto.CountryData;
import com.bookworm.ecommerce.dto.StateData;
import com.bookworm.ecommerce.entity.Country;
import com.bookworm.ecommerce.entity.State;
import com.bookworm.ecommerce.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/countries")
public class CountryController {
    @Autowired
    CountryService countryService;

    @PostMapping("/add-state")
    public ResponseEntity<State> addState(@RequestBody StateData stateData) {
        State result = countryService.addState(stateData);
        if(result != null) {
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/stateByName")
    public ResponseEntity<Boolean> stateExists(@RequestParam(name = "name") String name) {
        Boolean result = countryService.stateExists(name);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @PostMapping("/remove-state")
    public ResponseEntity<Boolean> removeState(@RequestParam(name = "id") Long id) {
        Boolean result = countryService.removeState(id);
        HttpStatus status = result ? HttpStatus.CREATED : HttpStatus.INTERNAL_SERVER_ERROR;
        return new ResponseEntity<>(result, status);
    }

    @PostMapping("/add")
    public ResponseEntity<Country> addCountry(@RequestBody CountryData countryData) {
        Country result = countryService.addCountry(countryData);
        if(result != null) {
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Country> editCountry(@PathVariable Long id, @RequestBody CountryData countryData) {
        return  countryService.editCountry(id, countryData);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> deleteCountry(@PathVariable Long id) {
        Boolean result = countryService.removeCountry(id);
        HttpStatus status = result ? HttpStatus.NO_CONTENT : HttpStatus.INTERNAL_SERVER_ERROR;
        return new ResponseEntity<>(result, status);
    }

}
