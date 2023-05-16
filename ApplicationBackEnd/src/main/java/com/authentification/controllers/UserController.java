package com.authentification.controllers;


import com.authentification.ServicesImp.UserServiceImpl;
import com.authentification.entities.User;
import com.authentification.payload.ForgotPasswordResponse;
import com.authentification.exceptions.InvalidTokenException;
import com.authentification.exceptions.UserNotFoundException;
import com.authentification.payload.MessageResponse;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.authentification.payload.LoginRequest;
import com.authentification.payload.SignupRequest;
import org.springframework.web.multipart.MultipartFile;
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

	@PutMapping("/{id_user}/update-firstname")
	public ResponseEntity<MessageResponse> updateFirstName(@PathVariable("id_user") Long id_user,
														   @RequestParam("newFirstName") String newFirstName) {
		return userService.updateFirstName(id_user, newFirstName);
	}

	@PutMapping("/{id_user}/update-lastname")
	public ResponseEntity<MessageResponse> updateLastName(@PathVariable("id_user") Long id_user,
														  @RequestParam("newLastName") String newLastName) {
		return userService.updateLastName(id_user, newLastName);
	}

	@PutMapping("/{id_user}/update-username")
	public ResponseEntity<MessageResponse> updateUsername(@PathVariable("id_user") Long id_user,
														  @RequestParam("newUsername") String newUsername) {
		return userService.updateUsername(id_user, newUsername);
	}

	@PutMapping("/{id_user}/update-email")
	public ResponseEntity<MessageResponse> updateEmail(@PathVariable("id_user") Long id_user,
													   @RequestParam("newEmail") String newEmail) {
		return userService.updateEmail(id_user, newEmail);
	}

	@PutMapping("/{id_user}/update-password")
	public ResponseEntity<MessageResponse>updatePassword(@PathVariable("id_user") Long id_user,
														 @RequestParam("newPassword") String newPassword) {
		return userService.updatePassword(id_user,newPassword);
	}

	@PutMapping("/{id_user}/update-profile-picture")
	public ResponseEntity<?> updateProfilePicture(@PathVariable("id_user") Long id_user, @RequestParam("profilePicture") MultipartFile profilePicture) throws IOException {

		return userService.updateProfilePicture(id_user, profilePicture);
	}

	@PutMapping("/{id_user}/update-homeaddress")
	public ResponseEntity<MessageResponse> updateHomeAddress(@PathVariable("id_user") Long id_user,
															 @RequestParam("newHomeAddress") String newHomeAddress) {
		return userService.updateHomeAddress(id_user, newHomeAddress);
	}

	@PutMapping("/{id_user}/update-phone")
	public ResponseEntity<MessageResponse> updatePhone(@PathVariable("id_user") Long id_user,
													   @RequestParam("newPhone") int newPhone) {
		return userService.updatePhone(id_user, newPhone);
	}

	@PutMapping("/{id_user}/update-description")
	public ResponseEntity<MessageResponse> updateDescription(@PathVariable("id_user") Long id_user,
															 @RequestParam("description") String newDescription) {
		return userService.updateDescription(id_user, newDescription);
	}

	@DeleteMapping("/{id_user}/delete-account")
	public ResponseEntity<?> deleteAccount(@PathVariable("id_user") Long id_user) {
		return userService.deleteAccount(id_user);
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
		} catch (MessagingException e) {
			throw new RuntimeException(e);
		} catch (IOException e) {
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



