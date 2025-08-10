package com.hyderabadinfra.userhistory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableKafka
@EnableAsync
@ComponentScan(basePackages = {"com.hyderabadinfra.userhistory", "com.hyderabadinfra.common"})
public class UserHistoryApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(UserHistoryApplication.class, args);
    }
}