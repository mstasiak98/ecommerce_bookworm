package com.bookworm.ecommerce.controller;

import com.bookworm.ecommerce.dto.WidgetData;
import com.bookworm.ecommerce.entity.Order;
import com.bookworm.ecommerce.service.WidgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/widget")
@CrossOrigin("http://localhost:4200")
public class WidgetController {


    @Autowired
    WidgetService widgetService;

    @GetMapping(value = "")
    public WidgetData getWidgetData() {
        return this.widgetService.getWidgetData();
    }


}
