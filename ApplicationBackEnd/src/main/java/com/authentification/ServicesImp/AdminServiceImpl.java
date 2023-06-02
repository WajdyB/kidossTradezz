package com.authentification.ServicesImp;

import com.authentification.entities.Annonce;
import com.authentification.entities.Comment;
import com.authentification.entities.User;
import com.authentification.jwt.JwtUtils;
import com.authentification.payload.MessageResponse;
import com.authentification.repositories.AnnonceRepository;
import com.authentification.repositories.CommentRepository;
import com.authentification.repositories.UserRepository;
import com.authentification.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.IContext;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;
import java.util.*;

import static com.authentification.entities.UserStatus.BLOCKED;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    UserRepository userRepository ;
    @Autowired
    AnnonceRepository annonceRepository ;
    @Autowired
    CommentRepository commentRepository;
    @Autowired
    JwtUtils jwtUtils ;
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private TemplateEngine templateEngine;
    @Value("${spring.mail.username}")
    private String from;


    public List<User> getUsers() {return userRepository.findAll();}
    public ResponseEntity<?> blockUser(Long id_user, String reason) throws MessagingException {
        Optional<User> optionalUser = userRepository.findById(id_user);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("User not found"));
        }
        User user = optionalUser.get();
        user.setStatus(BLOCKED);
        userRepository.save(user);
        String email = user.getEmail();
        String username = user.getUsername();
        sendAlertToUser(email, username, reason);
        return ResponseEntity.badRequest().body(new MessageResponse("User blocked successfully !"));
    }




    public void sendAlertToUser(String email, String username, String reason) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());
        helper.setTo(email);
        helper.setFrom(from);
        helper.setSubject("Your Toy Exchange Online account has been blocked");
        IContext context = new IContext() {
            @Override
            public Locale getLocale() {
                return Locale.getDefault();
            }
            @Override
            public boolean containsVariable(String s) {
                return s.equals("username") || s.equals("reason");
            }
            @Override
            public Set<String> getVariableNames() {
                return new HashSet<>(Arrays.asList("username", "reason"));
            }
            @Override
            public Object getVariable(String s) {
                if (s.equals("username")) {
                    return username;
                } else if (s.equals("reason")) {
                    return reason;
                } else {
                    return null;
                }
            }
        };
        String html = templateEngine.process("admin_alerts_template.html", context);
        helper.setText(html, true);

        mailSender.send(message);
    }
    public String getUserEmail(Long id_user) {
        User user = userRepository.findById(id_user).orElse(null);
        if (user == null) {
            return null;
        }
        return user.getEmail();
    }
    public String getUsername(Long id_user) {
        User user = userRepository.findById(id_user).orElse(null);
        if (user == null) {
            return null;
        }
        return user.getUsername();
    }
    public List<Annonce> getAnnonces() {return annonceRepository.findAll();}
    public ResponseEntity<MessageResponse> archiveAnnonce(Long id_annonce) {
        Optional<Annonce> annonceToArchive = annonceRepository.findById(id_annonce);
        if (annonceToArchive.isPresent()) {
            Annonce archivedAnnonce = annonceToArchive.get();
            archivedAnnonce.setEstArchive(true);
            annonceRepository.save(archivedAnnonce);
            return ResponseEntity.ok(new MessageResponse("Annonce archived successfully!"));
        }
        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<MessageResponse> restoreAnnonce(Long id_annonce) {
        Optional<Annonce> annonceToRestore = annonceRepository.findById(id_annonce);
        if (annonceToRestore.isPresent()) {
            Annonce restoredAnnonce = annonceToRestore.get();
            restoredAnnonce.setEstArchive(false);
            annonceRepository.save(restoredAnnonce);
            return ResponseEntity.ok(new MessageResponse("Annonce restored successfully!"));
        }
        return ResponseEntity.notFound().build();
    }

    public void deleteAnnonce ( Long id_annonce) {

        List<Comment> comments = commentRepository.findByAnnonceId(id_annonce);
        for (Comment comment : comments) {
            commentRepository.deleteById(comment.getId_comment());
        }
        annonceRepository.deleteById(id_annonce);
    }

}

