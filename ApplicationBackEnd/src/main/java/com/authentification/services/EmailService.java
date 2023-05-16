package com.authentification.services;

import com.authentification.payload.PasswordResetToken;
import com.authentification.entities.User;
import javax.mail.MessagingException;
import java.io.IOException;

public interface EmailService {
     void sendPasswordResetEmail(User user, PasswordResetToken token, String resetUrl)
             throws MessagingException, IOException ;
}