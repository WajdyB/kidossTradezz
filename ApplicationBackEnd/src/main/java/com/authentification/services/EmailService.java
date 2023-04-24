package com.authentification.services;

import com.authentification.entities.PasswordResetToken;
import com.authentification.entities.User;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Optional;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    ResourceLoader resourceLoader ;

    /*public void sendEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }*/

    public void sendPasswordResetEmail(User user, PasswordResetToken token, String resetUrl) throws MessagingException, IOException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(user.getEmail());
        helper.setSubject("Reset your password");

        // Read the contents of the email template from the resources folder
        Resource resource = resourceLoader.getResource("classpath:reset_password_template.html");
        String emailContent = new String(Files.readAllBytes(resource.getFile().toPath()));

        // Replace placeholders in the email template with actual values
        emailContent = emailContent.replace("{username}", user.getUsername());
        emailContent = emailContent.replace("{resetUrl}", resetUrl);

        helper.setText(emailContent, true);

        mailSender.send(message);
    }
}