package com.authentification.controllers;


import com.authentification.entities.User;
import com.authentification.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/admin/users")
public class AdminController {

    @Autowired
    AdminService adminService ;

    @GetMapping("/getAll")
    public List<User> getAllUsers() {
        return adminService.getAllUsers();
    }

    @PostMapping("/")
    public User createUser(@RequestBody User user) {
        return adminService.createUser(user);
    }



}



