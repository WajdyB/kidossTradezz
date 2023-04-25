package com.authentification.services;

import com.authentification.entities.User;
import com.authentification.exceptions.UserNotFoundException;
import com.authentification.payload.MessageResponse;
import com.authentification.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
@Transactional
public class AdminService {

    @Autowired
    UserRepository userRepository ;

    @Autowired
    private PasswordEncoder encoder;


    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User createUser(User user) {
        return userRepository.save(user) ;
    }

    public User updateUser (User updatedUser , MultipartFile profilePicture) throws IOException {
        User user = userRepository.findById(updatedUser.getId_user())
                .orElseThrow(() -> new UserNotFoundException("User not found with id " + updatedUser.getId_user())) ;

        // Check if the password in the updated user object is not null
        if (updatedUser.getPassword() != null) {
            user.setPassword(encoder.encode(updatedUser.getPassword()));
        }
        user.setFirstname(updatedUser.getFirstname());
        user.setLastname(updatedUser.getLastname());
        user.setUsername(updatedUser.getUsername());
        user.setEmail(updatedUser.getEmail());
        user.setHomeAddress(updatedUser.getHomeAddress());
        user.setPhone(updatedUser.getPhone());
        user.setAvgResponseTime(updatedUser.getAvgResponseTime());
        user.setDescription(updatedUser.getDescription());

        return userRepository.save(user) ;
    }
}
