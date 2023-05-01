package com.authentification.controllers;

import com.authentification.entities.User;
import com.authentification.payload.MessageResponse;
import com.authentification.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    AccountService accountService ;

    @GetMapping("/get-all-users")
    public List<User> getAllUsers() {
      return accountService.getAllUsers();
    }

    @GetMapping("/get-user/{username}")
    public ResponseEntity<Optional<User>> getUserByUsername(@PathVariable("username") String username) {
        return accountService.getUserByUsername(username);
    }

    @PutMapping("/{id_user}/update-firstname")
    public ResponseEntity<MessageResponse> updateFirstName(@PathVariable("id_user") Long id_user,
                                                           @RequestParam("newFirstName") String newFirstName) {
        return accountService.updateFirstName(id_user, newFirstName);
    }

    @PutMapping("/{id_user}/update-lastname")
    public ResponseEntity<MessageResponse> updateLastName(@PathVariable("id_user") Long id_user,
                                                          @RequestParam("newLastName") String newLastName) {
        return accountService.updateLastName(id_user, newLastName);
    }

    @PutMapping("/{id_user}/update-username")
    public ResponseEntity<MessageResponse> updateUsername(@PathVariable("id_user") Long id_user,
                                                          @RequestParam("newUsername") String newUsername) {
        return accountService.updateUsername(id_user, newUsername);
    }

    @PutMapping("/{id_user}/update-email")
    public ResponseEntity<MessageResponse> updateEmail(@PathVariable("id_user") Long id_user,
                                                       @RequestParam("newEmail") String newEmail) {
        return accountService.updateEmail(id_user, newEmail);
    }

    @PutMapping("/{id_user}/update-password")
    public ResponseEntity<MessageResponse>updatePassword(@PathVariable("id_user") Long id_user,
                                                         @RequestParam("newPassword") String newPassword) {
        return accountService.updatePassword(id_user,newPassword);
    }

    @PutMapping("/{id_user}/update-profile-picture")
    public ResponseEntity<?> updateProfilePicture(@PathVariable("id_user") Long id_user, @RequestParam("file") MultipartFile file) throws IOException {

               return (ResponseEntity<?>) accountService.updateProfilePicture(id_user, file);
    }

    @PutMapping("/{id_user}/update-homeaddress")
    public ResponseEntity<MessageResponse> updateHomeAddress(@PathVariable("id_user") Long id_user,
                                                             @RequestParam("newHomeAddress") String newHomeAddress) {
        return accountService.updateHomeAddress(id_user, newHomeAddress);
    }

    @PutMapping("/{id_user}/update-phone")
    public ResponseEntity<MessageResponse> updatePhone(@PathVariable("id_user") Long id_user,
                                                       @RequestParam("newPhone") int newPhone) {
        return accountService.updatePhone(id_user, newPhone);
    }

    @PutMapping("/{id_user}/update-avg-response-time")
    public ResponseEntity<MessageResponse> updateAvgResponseTime(@PathVariable("id_user") Long id_user,
                                                                 @RequestParam("newAvgResponseTime") String newAvgResponseTime) {
        return accountService.updateAvgResponseTime(id_user, newAvgResponseTime);
    }

    @PutMapping("/{id_user}/update-description")
    public ResponseEntity<MessageResponse> updateDescription(@PathVariable("id_user") Long id_user,
                                                                 @RequestParam("description") String newDescription) {
        return accountService.updateDescription(id_user, newDescription);
    }

    @DeleteMapping("/{id_user}/delete-account")
    public ResponseEntity<?> deleteAccount(@PathVariable("id_user") Long id_user) {
        return accountService.deleteAccount(id_user);
    }
}
