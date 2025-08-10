package com.hyderabadinfra.user.dto;

import jakarta.validation.constraints.NotBlank;

public class UserLoginRequest {
    
    @NotBlank(message = "Email or username is required")
    private String emailOrUsername;
    
    @NotBlank(message = "Password is required")
    private String password;
    
    // Constructors
    public UserLoginRequest() {}
    
    public UserLoginRequest(String emailOrUsername, String password) {
        this.emailOrUsername = emailOrUsername;
        this.password = password;
    }
    
    // Getters and setters
    public String getEmailOrUsername() {
        return emailOrUsername;
    }
    
    public void setEmailOrUsername(String emailOrUsername) {
        this.emailOrUsername = emailOrUsername;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
}