package com.hyderabadinfra.fileupload;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"com.hyderabadinfra"})
public class FileUploadServiceApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(FileUploadServiceApplication.class, args);
    }
}