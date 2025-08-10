package com.hyderabadinfra.user;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.kafka.annotation.EnableKafka;

@SpringBootApplication(scanBasePackages = {"com.hyderabadinfra"})
@EnableKafka
public class UserManagementApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(UserManagementApplication.class, args);
    }
}