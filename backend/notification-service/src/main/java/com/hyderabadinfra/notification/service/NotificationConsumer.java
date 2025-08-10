package com.hyderabadinfra.notification.service;

import com.hyderabadinfra.common.events.NotificationEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class NotificationConsumer {
    
    private static final Logger logger = LoggerFactory.getLogger(NotificationConsumer.class);
    
    @Autowired
    private EmailService emailService;
    
    @Autowired
    private SmsService smsService;
    
    @KafkaListener(topics = "notification-events", groupId = "notification-service-group")
    public void handleNotificationEvent(NotificationEvent event) {
        try {
            logger.info("Processing notification event: {} for user: {}", event.getEventType(), event.getUserId());
            
            switch (event.getNotificationType()) {
                case EMAIL -> emailService.sendEmail(event);
                case SMS -> smsService.sendSms(event);
                case PUSH -> {
                    // TODO: Implement push notification
                    logger.info("Push notification not yet implemented");
                }
            }
            
            logger.info("Notification sent successfully: {} to {}", event.getEventType(), event.getEmail());
            
        } catch (Exception e) {
            logger.error("Failed to process notification event: {} - {}", event.getEventType(), e.getMessage());
        }
    }
}