package com.hyderabadinfra.property;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.kafka.annotation.EnableKafka;

@SpringBootApplication(scanBasePackages = {"com.hyderabadinfra"})
@EnableKafka
public class PropertyManagementApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(PropertyManagementApplication.class, args);
    }
}