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
     ResponseEntity<MessageResponse> updateFirstName(String newFirstName,String token) ;
     ResponseEntity<MessageResponse> updateLastName(String newLastName,String token) ;
     ResponseEntity<MessageResponse> updateUsername(String newUsername,String token) ;
     ResponseEntity<MessageResponse> updateEmail(String newEmail,String token) ;
     ResponseEntity<MessageResponse> updatePassword(String newPassword,String token) ;
     ResponseEntity<Map<String, Object>> updateProfilePicture(MultipartFile profilePicture,String token) throws IOException ;
     ResponseEntity<MessageResponse> updateHomeAddress(String newHomeAddress,String token) ;
     ResponseEntity<MessageResponse> updatePhone(int newPhone,String token) ;
     ResponseEntity<MessageResponse> updateDescription(String newDescription,String token) ;
     ResponseEntity<MessageResponse> deleteAccount(String token) ;
     void logoutUser(HttpServletRequest request) ;
     void resetPassword(String token, String newPassword) ;
     String forgotPassword(String email) throws MessagingException, IOException ;

}


