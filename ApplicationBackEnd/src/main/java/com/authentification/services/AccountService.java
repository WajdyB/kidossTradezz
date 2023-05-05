package com.authentification.services;

import com.authentification.entities.Annonce;
import com.authentification.entities.User;
import com.authentification.payload.MessageResponse;
import com.authentification.repositories.UserRepository;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
@Transactional
public class AccountService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder encoder;


    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id_user) throws NotFoundException {
        Optional<User> annonceOptional = userRepository.findById(id_user);
        if (annonceOptional.isPresent()) {
            return annonceOptional.get();
        } else {
            throw new NotFoundException("Annonce with id " + id_user + " not found.");
        }
    }

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
        existentUser.setPassword(encoder.encode(newPassword));
        try {
            userRepository.save(existentUser);
            return ResponseEntity.ok(new MessageResponse("Password modified successfully!"));
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to modify password"));
        }
    }

    public ResponseEntity<Map<String, Object>> updateProfilePicture(Long id_user, MultipartFile profilePicture) throws IOException {
        Map<String, Object> response = new HashMap<>();

        Optional<User> userOptional = userRepository.findById(id_user);
        if (!userOptional.isPresent()) {
            response.put("message", "Error: User not found!");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }

        User user = userOptional.get();

        String originalFilename = profilePicture.getOriginalFilename();
        String fileName = originalFilename.split("\\.", 2)[0];
        String fileExtension = originalFilename.split("\\.", 2)[1];
        String modifiedDate = new Date().toString().replace(':', '.');
        byte[] bytes = profilePicture.getBytes();
        Path path = Paths.get("C:/pfe/kidossTradezz/ApplicationBackEnd/src/main/webapp/WEB-INF/images/profiles/" + fileName + modifiedDate + "." + fileExtension);
        Files.write(path, bytes);

        user.setProfilePicture(fileName + modifiedDate + "." + fileExtension);
        userRepository.save(user);

        response.put("message", "Profile picture updated successfully!");
        response.put("profilePicture", user.getProfilePicture());
        return new ResponseEntity<>(response, HttpStatus.OK);
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

