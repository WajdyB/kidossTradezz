package com.authentification.controllers;

import com.authentification.ServicesImp.AdminServiceImpl;
import com.authentification.ServicesImp.UserServiceImpl;
import com.authentification.entities.Annonce;
import com.authentification.entities.User;
import com.authentification.payload.LoginRequest;
import com.authentification.payload.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminServiceImpl adminService;

    @Autowired
    private UserServiceImpl userService ;



    @GetMapping("/get-all-users")
    public List<User> getUsers() {
       return adminService.getUsers();
    }


    @PostMapping("/signin")
    public ResponseEntity<?> authenticateAdmin(@RequestBody LoginRequest loginRequest) {
        return userService.authenticateUser(loginRequest);
    }

    @GetMapping("/get-all-annonces")
    public List<Annonce> getAnnonces() {
        return adminService.getAnnonces();
    }

    @PutMapping("/annonces/archive/{id_annonce}")
    public ResponseEntity<MessageResponse> archiveAnnonce(@PathVariable("id_annonce") Long id_annonce) {
        return adminService.archiveAnnonce(id_annonce);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutAdmin(HttpServletRequest request) {
        userService.logoutUser(request);
        return ResponseEntity.ok().body(new MessageResponse("Admin successfully logged out"));
    }

    @PostMapping("/block-user/{id_user}")
    public ResponseEntity<String> blockUser(@PathVariable Long id_user, @RequestParam String reason) throws MessagingException {
        // block the user with the given ID and reason
        adminService.blockUser(id_user, reason);

        // send an alert to the blocked user
        String email = adminService.getUserEmail(id_user);
        String username = adminService.getUsername(id_user);
        adminService.sendAlertToUser(email, username, reason);

        return ResponseEntity.ok("User blocked successfully");
    }

}
