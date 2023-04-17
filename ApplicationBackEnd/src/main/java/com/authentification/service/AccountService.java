package com.authentification.service;

import com.authentification.entities.User;
import com.authentification.jwt.JwtUtils;
import com.authentification.payload.MessageResponse;
import com.authentification.repositories.UserRepository;
import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
public class AccountService {

    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<Optional<User>> getUserByUsername (String username){
        Optional<User> user = userRepository.findByUsername(username);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<MessageResponse> updateFirstName(Long id_user, String newFirstName) {
        User existentUser = userRepository.findById(id_user).orElse(null);
        if (existentUser == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("User not found"));
        }
        existentUser.setFirstname(newFirstName);
        try {
            userRepository.save(existentUser);
            return ResponseEntity.ok(new MessageResponse("Lastname modified successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to modify lastname"));
        }
    }

    public ResponseEntity<MessageResponse> updateLastName(Long id_user, String newLastName) {
        User existentUser = userRepository.findById(id_user).orElse(null);
        if (existentUser == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("User not found"));
        }
        existentUser.setLastname(newLastName);
        try {
            userRepository.save(existentUser);
            return ResponseEntity.ok(new MessageResponse("Lastname modified successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to modify lastname"));
        }
    }

    public ResponseEntity<MessageResponse> updateUsername(Long id_user, String newUsername) {
        User existentUser = userRepository.findById(id_user).orElse(null);
        if (existentUser == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("User not found"));
        }
        Optional<User> userWithNewUsername = userRepository.findByUsername(newUsername);
        if (userWithNewUsername.isPresent()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Username already exists"));
        }
        existentUser.setUsername(newUsername);
        try {
            userRepository.save(existentUser);
            return ResponseEntity.ok(new MessageResponse("Username modified successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to modify username"));
        }
    }

    public ResponseEntity<MessageResponse> updateEmail(Long id_user, String newEmail) {
        User existentUser = userRepository.findById(id_user).orElse(null);
        if (existentUser == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("User not found"));
        }
        Optional<User> userWithNewEmail = userRepository.findByEmail(newEmail);
        if (userWithNewEmail.isPresent()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Email already exists"));
        }
        existentUser.setEmail(newEmail);
        try {
            userRepository.save(existentUser);
            return ResponseEntity.ok(new MessageResponse("Email modified successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to modify email"));
        }
    }

    public ResponseEntity<MessageResponse> updatePassword(Long id_user, String newPassword) {
        User existentUser = userRepository.findById(id_user).orElse(null);
        if (existentUser == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("User not found"));
        }
        existentUser.setPassword(newPassword);
        try {
            userRepository.save(existentUser);
            return ResponseEntity.ok(new MessageResponse("Password modified successfully!"));
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to modify password"));
        }
    }

    public Map<String, Object> updateProfilePicture(Long userId, MultipartFile profilePicture) throws IOException {
        Map<String, Object> response = new HashMap<>();

        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) {
            response.put("message", "Error: User not found!");
            return response;
        }
        User user = userOptional.get();
        String fileName = profilePicture.getOriginalFilename();
        Path path = Paths.get("C:/ProfilePictures/" + fileName);
        Files.write(path, profilePicture.getBytes());
        user.setProfilePicturePath(path.toString());
        userRepository.save(user);

        response.put("message", "Profile picture updated successfully!");
        response.put("profilePicturePath", user.getProfilePicturePath());
        return response;
    }

    public ResponseEntity<MessageResponse> updateHomeAddress(Long id_user, String newHomeAddress) {
        User existentUser = userRepository.findById(id_user).orElse(null);
        if (existentUser == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("User not found"));
        }
        existentUser.setHomeAddress(newHomeAddress);
        try {
            userRepository.save(existentUser);
            return ResponseEntity.ok(new MessageResponse("Home address modified successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to modify home address"));
        }
    }

    public ResponseEntity<MessageResponse> updatePhone(Long id_user, int newPhone) {
        User existentUser = userRepository.findById(id_user).orElse(null);
        if (existentUser == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("User not found"));
        }
        existentUser.setPhone(newPhone);
        try {
            userRepository.save(existentUser);
            return ResponseEntity.ok(new MessageResponse("Phone number modified successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to modify phone number"));
        }
    }

    public ResponseEntity<MessageResponse> updateAvgResponseTime(Long id_user, String newAvgResponseTime) {
        User existentUser = userRepository.findById(id_user).orElse(null);
        if (existentUser == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("User not found"));
        }
        existentUser.setAvgResponseTime(newAvgResponseTime);
        try {
            userRepository.save(existentUser);
            return ResponseEntity.ok(new MessageResponse("Average response time modified successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to modify average response time"));
        }
    }

    public ResponseEntity<MessageResponse> updateDescription(Long id_user,String newDesciption) {
        User existentUser = userRepository.findById(id_user).orElse(null) ;
        if (existentUser == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("User not found")) ;
        }
        existentUser.setDescription(newDesciption);
        try {
            userRepository.save(existentUser);
            return ResponseEntity.ok(new MessageResponse("Description modified successfully!")) ;
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to modify description"));
        }
    }

    public ResponseEntity<MessageResponse> deleteAccount(Long id_user) {
        User existentUser = userRepository.findById(id_user).orElse(null);

        if (existentUser == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("Not found"));
        }

        try {
            userRepository.deleteById(id_user);
            return ResponseEntity.ok(new MessageResponse("Deleted successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Not delete"));
        }
    }

}

