package com.authentification.controllers;


import com.authentification.ServicesImp.UserServiceImpl;
import com.authentification.entities.User;
import com.authentification.payload.ForgotPasswordResponse;
import com.authentification.exceptions.InvalidTokenException;
import com.authentification.exceptions.UserNotFoundException;
import com.authentification.payload.MessageResponse;
import com.fasterxml.jackson.annotation.JsonIgnore;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.authentification.payload.LoginRequest;
import com.authentification.payload.SignupRequest;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.security.RolesAllowed;
import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class UserController {
	@Autowired
	private UserServiceImpl userService;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
		return userService.authenticateUser(loginRequest);
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@RequestBody SignupRequest signUpRequest) {
		Map<String, Object> response = userService.registerUser(signUpRequest);
		return ResponseEntity.ok().body(response);
	}

	@GetMapping("/get-all-users")
	public List<User> getAllUsers() {
		return userService.getAllUsers();
	}

	@GetMapping("/{id_user}/get-user")
	public User getUserById (@PathVariable("id_user") Long id_user) throws NotFoundException {
		return userService.getUserById(id_user) ;
	}

	@GetMapping("/get-user/{username}")
	public ResponseEntity<Optional<User>> getUserByUsername(@PathVariable("username") String username) {
		return userService.getUserByUsername(username);
	}

	@PutMapping("/update-firstname")
	public ResponseEntity<MessageResponse> updateFirstName(@RequestHeader("Authorization") String token,
														   @RequestParam("newFirstName") String newFirstName) {
		return userService.updateFirstName(newFirstName,token);
	}

	@PutMapping("/update-lastname")
	public ResponseEntity<MessageResponse> updateLastName(@RequestHeader("Authorization") String token,
														  @RequestParam("newLastName") String newLastName) {
		return userService.updateLastName(newLastName,token);
	}

	@PutMapping("/update-username")
	public ResponseEntity<MessageResponse> updateUsername(@RequestHeader("Authorization") String token,
														  @RequestParam("newUsername") String newUsername) {
		return userService.updateUsername(newUsername,token);
	}

	@PutMapping("/update-email")
	public ResponseEntity<MessageResponse> updateEmail(@RequestHeader("Authorization") String token,
													   @RequestParam("newEmail") String newEmail) {
		return userService.updateEmail(newEmail,token);
	}

	@PutMapping("/update-password")
	public ResponseEntity<MessageResponse>updatePassword(@RequestHeader("Authorization") String token,
														 @RequestParam("newPassword") String newPassword) {
		return userService.updatePassword(newPassword,token);
	}

	@PutMapping("/update-profile-picture")
	public ResponseEntity<?> updateProfilePicture(@RequestHeader("Authorization") String token, @RequestParam("profilePicture") MultipartFile profilePicture) throws IOException {

		return userService.updateProfilePicture(profilePicture,token);
	}

	@PutMapping("/update-homeaddress")
	public ResponseEntity<MessageResponse> updateHomeAddress(@RequestHeader("Authorization") String token,
															 @RequestParam("newHomeAddress") String newHomeAddress) {
		return userService.updateHomeAddress(newHomeAddress,token);
	}

	@PutMapping("/update-phone")
	public ResponseEntity<MessageResponse> updatePhone(@RequestHeader("Authorization") String token,
													   @RequestParam("newPhone") int newPhone) {
		return userService.updatePhone(newPhone,token);
	}

	@PutMapping("/update-description")
	public ResponseEntity<MessageResponse> updateDescription(@RequestHeader("Authorization") String token,
															 @RequestParam("newDescription") String newDescription) {
		return userService.updateDescription(newDescription,token);
	}

	@DeleteMapping("/delete-account")
	public ResponseEntity<?> deleteAccount(@RequestHeader("Authorization") String token) {
		return userService.deleteAccount(token);
	}



	@PostMapping("/logout")
	public ResponseEntity<?> logoutUser(HttpServletRequest request) {
		userService.logoutUser(request);
		return ResponseEntity.ok().body(new MessageResponse("User successfully logged out"));
	}

	@PostMapping("/forgot-password")
	public ResponseEntity<?> forgotPassword(@RequestParam String email) {
		try {
			String token = userService.forgotPassword(email);
			String emailMessage = "An email with instructions to reset your password has been sent to your email address.";
			String tokenMessage = token;
			return ResponseEntity.ok().body(new ForgotPasswordResponse(emailMessage, tokenMessage));
		} catch (UserNotFoundException ex) {
			return ResponseEntity.badRequest().body("User not found.");
		} catch (MessagingException | IOException e) {
			throw new RuntimeException(e);
		}
	}

	@PostMapping("/reset-password")
	public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
		try {
			userService.resetPassword(token, newPassword);
			return ResponseEntity.ok("Your password has been reset successfully.");
		} catch (InvalidTokenException ex) {
			return ResponseEntity.badRequest().body("Invalid token.");
		}
	}



}