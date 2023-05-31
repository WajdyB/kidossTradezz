package com.authentification.services;

import com.authentification.entities.Annonce;
import com.authentification.entities.User;
import com.authentification.payload.MessageResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import javax.mail.MessagingException;
import java.util.*;

@Service
public interface AdminService {
     List<User> getUsers() ;
     ResponseEntity<?> blockUser(Long id_user, String reason) throws MessagingException ;
    void sendAlertToUser(String email, String username, String reason) throws MessagingException ;
     String getUserEmail(Long id_user) ;
     String getUsername(Long id_user) ;
     List<Annonce> getAnnonces() ;
     ResponseEntity<MessageResponse> archiveAnnonce(Long id_annonce) ;
     ResponseEntity<MessageResponse> restoreAnnonce(Long id_annonce);
    void deleteAnnonce ( Long id_annonce);




}
