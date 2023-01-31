package com.bookworm.ecommerce.service;

import com.bookworm.ecommerce.dao.FormatRepository;
import com.bookworm.ecommerce.entity.Format;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FormatService {

    @Autowired
    FormatRepository formatRepository;


    public List<Format> findByIds(List<Long> ids) {
        List<Format> bookFormats = formatRepository.findAllById(ids);
        if(bookFormats.isEmpty()) return null;
        else return bookFormats;
    }

}
