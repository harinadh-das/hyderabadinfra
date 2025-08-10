package com.hyderabadinfra.common.events;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;
import java.util.Map;

public class NotificationEvent {
    
    public enum NotificationType {
        EMAIL,
        SMS,
        PUSH
    }
    
    public enum EventType {
        WELCOME_EMAIL,
        PROPERTY_ALERT,
        PASSWORD_RESET,
        BOOKING_CONFIRMATION,
        GENERAL_NOTIFICATION
    }
    
    private String userId;
    private String email;
    private String phoneNumber;
    private NotificationType notificationType;
    private EventType eventType;
    private String subject;
    private String message;
    private Map<String, Object> templateData;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime timestamp;
    
    public NotificationEvent() {
        this.timestamp = LocalDateTime.now();
    }
    
    public NotificationEvent(String userId, String email, NotificationType notificationType, 
                           EventType eventType, String subject, String message) {
        this();
        this.userId = userId;
        this.email = email;
        this.notificationType = notificationType;
        this.eventType = eventType;
        this.subject = subject;
        this.message = message;
    }
    
    // Getters and setters
    public String getUserId() {
        return userId;
    }
    
    public void setUserId(String userId) {
        this.userId = userId;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPhoneNumber() {
        return phoneNumber;
    }
    
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    
    public NotificationType getNotificationType() {
        return notificationType;
    }
    
    public void setNotificationType(NotificationType notificationType) {
        this.notificationType = notificationType;
    }
    
    public EventType getEventType() {
        return eventType;
    }
    
    public void setEventType(EventType eventType) {
        this.eventType = eventType;
    }
    
    public String getSubject() {
        return subject;
    }
    
    public void setSubject(String subject) {
        this.subject = subject;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public Map<String, Object> getTemplateData() {
        return templateData;
    }
    
    public void setTemplateData(Map<String, Object> templateData) {
        this.templateData = templateData;
    }
    
    public LocalDateTime getTimestamp() {
        return timestamp;
    }
    
    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}