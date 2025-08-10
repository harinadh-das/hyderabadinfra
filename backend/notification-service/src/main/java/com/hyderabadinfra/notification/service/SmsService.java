package com.hyderabadinfra.notification.service;

import com.hyderabadinfra.common.events.NotificationEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class SmsService {
    
    private static final Logger logger = LoggerFactory.getLogger(SmsService.class);
    
    public void sendSms(NotificationEvent event) {
        // In a real implementation, integrate with SMS providers like Twilio, AWS SNS, etc.
        logger.info("Sending SMS to {}: {}", event.getPhoneNumber(), event.getMessage());
        
        // Mock SMS sending
        try {
            Thread.sleep(100); // Simulate API call
            logger.info("SMS sent successfully to {}", event.getPhoneNumber());
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            logger.error("Failed to send SMS: {}", e.getMessage());
        }
    }
}