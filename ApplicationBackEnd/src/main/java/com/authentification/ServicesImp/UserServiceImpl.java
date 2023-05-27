package com.authentification.ServicesImp;

import com.authentification.entities.*;
import com.authentification.exceptions.InvalidTokenException;
import com.authentification.exceptions.UserNotFoundException;
import com.authentification.jwt.JwtUtils;
import com.authentification.jwt.Utils;
import com.authentification.payload.*;
import com.authentification.repositories.*;
import com.authentification.services.EmailService;
import com.authentification.services.UserService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private AnnonceRepository annonceRepository;
    @Autowired
    private FavoriteRepository favoriteRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RatingRepository ratingRepository;
    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;
    @Autowired
    private EmailService emailService;


    public ResponseEntity<?> authenticateUser(LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);

            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

            if (userDetails.getStatus().equals(UserStatus.BLOCKED)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(new MessageResponse("Your account has been blocked!!"));
            }

            return ResponseEntity.ok(new JwtResponse(jwt,
                    userDetails.getId(),
                    userDetails.getUsername(),
                    userDetails.getEmail(),
                    null));
        } catch (AuthenticationException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new MessageResponse("Invalid username or password"));
        }
    }
    public Map<String, Object> registerUser(SignupRequest signUpRequest) {
        Map<String, Object> response = new HashMap<>();
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            response.put("message", "Error: Username is already taken!");
            return response;
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            response.put("message", "Error: Email is already in use!");
            return response;
        }
        User user = new User(
                signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                signUpRequest.getFirstname(),
                signUpRequest.getLastname(),
                signUpRequest.getHomeAddress(),
                signUpRequest.getPhone(),
                signUpRequest.getDescription(),
                encoder.encode(signUpRequest.getPassword())
        );

        userRepository.save(user);
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signUpRequest.getUsername(), signUpRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        String successMessage = "User " + signUpRequest.getUsername() + " registered successfully!";
        String tokenMessage = "Signup token: " + jwt;
        response.put("message", Arrays.asList(new MessageResponse(successMessage), new MessageResponse(tokenMessage)));
        response.put("id", user.getId_user());
        return response;
    }

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

    public ResponseEntity<Optional<User>> getUserByUsername(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<MessageResponse> updateFirstName(String newFirstName , String token) {
        Long id_user = jwtUtils.getUserIdFromToken(token);
        User existentUser = userRepository.findById(id_user).orElse(null);
        if (existentUser == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("User not found"));
        }
        existentUser.setFirstname(newFirstName);
        try {
            userRepository.save(existentUser);
            return ResponseEntity.ok(new MessageResponse("Firstname modified successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to modify firstname"));
        }
    }

    public ResponseEntity<MessageResponse> updateLastName(String newLastName,String token) {
        Long id_user = jwtUtils.getUserIdFromToken(token);
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

    public ResponseEntity<MessageResponse> updateUsername(String newUsername , String token) {
        Long id_user = jwtUtils.getUserIdFromToken(token);
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

    public ResponseEntity<MessageResponse> updateEmail(String newEmail, String token) {
        Long id_user = jwtUtils.getUserIdFromToken(token);
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

    public ResponseEntity<MessageResponse> updatePassword(String newPassword,String token) {
        Long id_user = jwtUtils.getUserIdFromToken(token);
        User existentUser = userRepository.findById(id_user).orElse(null);
        if (existentUser == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("User not found"));
        }
        existentUser.setPassword(encoder.encode(newPassword));
        try {
            userRepository.save(existentUser);
            return ResponseEntity.ok(new MessageResponse("Password modified successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to modify password"));
        }
    }

    public ResponseEntity<Map<String, Object>> updateProfilePicture(MultipartFile profilePicture,String token) throws IOException {
        Long id_user = jwtUtils.getUserIdFromToken(token);
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

    public ResponseEntity<MessageResponse> updateHomeAddress(String newHomeAddress,String token) {
        Long id_user = jwtUtils.getUserIdFromToken(token);
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

    public ResponseEntity<MessageResponse> updatePhone(int newPhone,String token) {
        Long id_user = jwtUtils.getUserIdFromToken(token);
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

    public ResponseEntity<MessageResponse> updateDescription(String newDescription,String token) {
        Long id_user = jwtUtils.getUserIdFromToken(token);
        User existentUser = userRepository.findById(id_user).orElse(null);
        if (existentUser == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("User not found"));
        }
        existentUser.setDescription(newDescription);
        try {
            userRepository.save(existentUser);
            return ResponseEntity.ok(new MessageResponse("Description modified successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to modify description"));
        }
    }

    public ResponseEntity<MessageResponse> deleteAccount(String token) {
        Long id_user = jwtUtils.getUserIdFromToken(token);
        User existentUser = userRepository.findById(id_user).orElse(null);
        if (existentUser == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("User Not found"));
        }
        List<Favorite> favorites = favoriteRepository.findByUser(existentUser);
        for (Favorite favorite : favorites) {
            favoriteRepository.deleteById(favorite.getFavorite_id());
        }
        List<Rating> ratings = ratingRepository.findByRatedUserId(id_user);
        for (Rating rating : ratings) {
            ratingRepository.deleteById(rating.getId());
        }
        try {
            List<Annonce> annonces = annonceRepository.findByUser(existentUser);
            for (Annonce annonce : annonces) {
                List<Favorite> annonceFavorites = favoriteRepository.findByAnnonce(annonce);
                for (Favorite favorite : annonceFavorites) {
                    favoriteRepository.deleteById(favorite.getFavorite_id());
                }
                annonceRepository.deleteById(annonce.getId_annonce());
            }
            userRepository.deleteById(id_user);
            return ResponseEntity.ok(new MessageResponse("Account deleted successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Account not deleted"));
        }
    }

    public void logoutUser(HttpServletRequest request) {
        String token = extractJwtFromRequest(request);
        jwtUtils.invalidateJwtToken(token);
    }

    private String extractJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
    public void resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token);
        if (resetToken == null || resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new InvalidTokenException("Invalid or expired token");
        }

        User user = userRepository.findByEmail(resetToken.getUserEmail()).orElse(null);
        if (user == null) {
            throw new UserNotFoundException("User not found");
        }

        user.setPassword(encoder.encode(newPassword));
        userRepository.save(user);
        passwordResetTokenRepository.delete(resetToken);
    }

    public String forgotPassword(String email) throws MessagingException, IOException {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            throw new UserNotFoundException("User not found");
        }

        User user = userOptional.get();

        PasswordResetToken token = passwordResetTokenRepository.findByUserEmail(email);
        if (token != null) {
            passwordResetTokenRepository.delete(token);
        }

        String newToken = Utils.generateRandomToken();
        PasswordResetToken newResetToken = new PasswordResetToken();
        newResetToken.setToken(newToken);
        newResetToken.setUserEmail(email);
        newResetToken.setExpiryDate(LocalDateTime.now().plusHours(1));
        passwordResetTokenRepository.save(newResetToken);

        String resetUrl = "http://localhost:3000/resetpassword?token=" + newToken;

        emailService.sendPasswordResetEmail(user, newResetToken, resetUrl);

        return newToken;
    }


}


