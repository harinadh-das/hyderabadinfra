package com.hyderabadinfra.notification.service;

import com.hyderabadinfra.common.events.NotificationEvent;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;
    
    @Autowired
    private TemplateEngine templateEngine;
    
    @Value("${spring.mail.username}")
    private String fromEmail;
    
    public void sendEmail(NotificationEvent event) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        
        helper.setFrom(fromEmail);
        helper.setTo(event.getEmail());
        helper.setSubject(event.getSubject());
        
        String htmlContent = buildEmailContent(event);
        helper.setText(htmlContent, true);
        
        mailSender.send(message);
    }
    
    private String buildEmailContent(NotificationEvent event) {
        Context context = new Context();
        context.setVariable("subject", event.getSubject());
        context.setVariable("message", event.getMessage());
        
        if (event.getTemplateData() != null) {
            event.getTemplateData().forEach(context::setVariable);
        }
        
        String template = getTemplateByEventType(event.getEventType());
        return templateEngine.process(template, context);
    }
    
    private String getTemplateByEventType(NotificationEvent.EventType eventType) {
        return switch (eventType) {
            case WELCOME_EMAIL -> "welcome-email";
            case PROPERTY_ALERT -> "property-alert";
            case PASSWORD_RESET -> "password-reset";
            case BOOKING_CONFIRMATION -> "booking-confirmation";
            default -> "general-notification";
        };
    }
}