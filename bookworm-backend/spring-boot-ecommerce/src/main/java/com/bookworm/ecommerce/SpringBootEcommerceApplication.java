package com.bookworm.ecommerce;

import com.bookworm.ecommerce.service.FileStorageService;
import jakarta.annotation.Resource;
import org.modelmapper.ModelMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SpringBootEcommerceApplication implements CommandLineRunner {

	@Resource
	FileStorageService storageService;

	public static void main(String[] args) {
		SpringApplication.run(SpringBootEcommerceApplication.class, args);
	}


	@Override
	public void run(String... arg) throws Exception {
		storageService.init();
	}

	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

}
