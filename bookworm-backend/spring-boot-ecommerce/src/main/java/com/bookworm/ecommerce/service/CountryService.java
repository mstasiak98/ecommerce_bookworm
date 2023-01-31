package com.bookworm.ecommerce.service;

import com.bookworm.ecommerce.dao.CountryRepository;
import com.bookworm.ecommerce.dao.StateRepository;
import com.bookworm.ecommerce.dto.CountryData;
import com.bookworm.ecommerce.dto.StateData;
import com.bookworm.ecommerce.entity.Country;
import com.bookworm.ecommerce.entity.State;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
public class CountryService {


    @Autowired
    CountryRepository countryRepository;

    @Autowired
    StateRepository stateRepository;
    public State addState(StateData stateData) {
        try {
            Optional<Country> countryData = this.countryRepository.findById(stateData.getCountryId());
            if(countryData.isPresent()){
                Country country = countryData.get();
                Optional<State> existingState = stateRepository.findByName(stateData.getName());
                if(existingState.isPresent()) return null;

                State savedState = stateRepository.save(new State(stateData.getName(), country));
                country.add(savedState);
                countryRepository.save(country);
                return savedState;
            }
            return null;
        } catch (Exception e) {
            return null;
        }
    }

    public Boolean stateExists(String name) {
        return stateRepository.existsStateByName(name);
    }

    public Boolean removeState(Long id) {
        Optional<State> stateData = stateRepository.findById(id);
        if(stateData.isPresent()) {
            stateRepository.delete(stateData.get());
            return true;
        }
        return false;
    }

    @Transactional
    public Country addCountry(CountryData countryData) {
        try {
            Country newCountry = countryRepository.save(
                    new Country(countryData.getCode(), countryData.getName()));

            Set<String> states = countryData.getStates();
            states.forEach(s -> {
                State savedState = stateRepository.save(new State(s, newCountry));
                newCountry.add(savedState);
            });
            return countryRepository.save(newCountry);
        } catch (Exception e) {
            return null;
        }
    }

    public Boolean removeCountry(Long id) {
        try {
            countryRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Transactional
    public ResponseEntity<Country> editCountry(Long id, CountryData countryData) {
        try {
            Optional<Country> oldCountryData = countryRepository.findById(id);
            if(oldCountryData.isPresent()) {
                Country oldCountry = oldCountryData.get();
                Set<String> newStates = countryData.getStates();
                Set<String> oldStates = oldCountry.getStates().stream().map(x -> x.getName()).collect(Collectors.toSet());

                if(!newStates.equals(oldStates)) {
                    stateRepository.deleteAllByCountry_Id(oldCountry.getId());
                    oldCountry.setStates(new HashSet<>());
                    newStates.forEach(state -> {
                        State savedState = stateRepository.save(new State(state, oldCountry));
                        oldCountry.add(savedState);
                    });
                }
                oldCountry.setName(countryData.getName());
                oldCountry.setCode(countryData.getCode());
                return new ResponseEntity<>(countryRepository.save(oldCountry), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
