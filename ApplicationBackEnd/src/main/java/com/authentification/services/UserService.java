package com.authentification.services;

import com.authentification.entities.User;
import com.authentification.payload.LoginRequest;
import com.authentification.payload.MessageResponse;
import com.authentification.payload.SignupRequest;
import javassist.NotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.*;

public interface UserService {

     List<User> getAllUsers() ;
     User getUserById(Long id_user) throws NotFoundException;
     ResponseEntity<Optional<User>> getUserByUsername(String username) ;
     ResponseEntity<?> authenticateUser(LoginRequest loginRequest) ;
     Map<String, Object> registerUser(SignupRequest signUpRequest) ;
     ResponseEntity<MessageResponse> updateFirstName(Long id_user, String newFirstName) ;
     ResponseEntity<MessageResponse> updateLastName(Long id_user, String newLastName) ;
     ResponseEntity<MessageResponse> updateUsername(Long id_user, String newUsername) ;
     ResponseEntity<MessageResponse> updateEmail(Long id_user, String newEmail) ;
     ResponseEntity<MessageResponse> updatePassword(Long id_user, String newPassword) ;
     ResponseEntity<Map<String, Object>> updateProfilePicture(Long id_user, MultipartFile profilePicture) throws IOException ;
     ResponseEntity<MessageResponse> updateHomeAddress(Long id_user, String newHomeAddress) ;
     ResponseEntity<MessageResponse> updatePhone(Long id_user, int newPhone) ;
     ResponseEntity<MessageResponse> updateDescription(Long id_user, String newDesciption) ;
     ResponseEntity<MessageResponse> deleteAccount(Long id_user) ;
     void logoutUser(HttpServletRequest request) ;
     void resetPassword(String token, String newPassword) ;
     String forgotPassword(String email) throws MessagingException, IOException ;

}


