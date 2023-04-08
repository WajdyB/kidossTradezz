package com.authentification.controllers;

import com.authentification.entities.User;
import com.authentification.payload.MessageResponse;
import com.authentification.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/accounts")
public class AccountController {

    @Autowired
    AccountService accountService ;

    // Update account :

   /* @PutMapping("/{user_id}/update-account")
    public ResponseEntity<?> updateAccount(@PathVariable("user_id") Long user_id , @RequestBody User user ) {

        ResponseEntity<MessageResponse> accountModified = accountService.updateAccount(user_id, user) ;

        if (accountModified == null) {
            return ResponseEntity.ok(new MessageResponse("Not modified !"));
        }
        return ResponseEntity.ok(new MessageResponse("Modified successfully !"));
    }*/
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
    @PutMapping("/{id_user}/update-avgresponsetime")
    public ResponseEntity<MessageResponse> updateAvgResponseTime(@PathVariable("id_user") Long id_user,
                                                                 @RequestParam("newAvgResponseTime") String newAvgResponseTime) {
        return accountService.updateAvgResponseTime(id_user, newAvgResponseTime);
    }


    @PutMapping("/{id_user}/update-description")
    public ResponseEntity<MessageResponse> updateDescription(@PathVariable("id_user") Long id_user,
                                                             @RequestParam("newDescription") String newDescription) {
        return accountService.updateDescription(id_user, newDescription);
    }
    @PutMapping("/{id_user}/update-password")
    public ResponseEntity<MessageResponse>updatePassword(@PathVariable("id_user") Long id_user,
                                                         @RequestParam("newPassword") String newPassword) {
        return accountService.updatePassword(id_user,newPassword);
    }

    // Delete account:

    @DeleteMapping("/{user_id}/delete-account")
    public ResponseEntity<?> deleteAccount(@PathVariable("user_id") Long user_id) {
        accountService.deleteAccount(user_id);
        return ResponseEntity.ok(new MessageResponse("Deleted successfully!"));
    }


}
