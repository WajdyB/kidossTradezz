package com.authentification.ServicesImp;

import com.authentification.entities.Annonce;
import com.authentification.entities.Comment;
import com.authentification.entities.Notification;
import com.authentification.entities.User;
import com.authentification.jwt.JwtUtils;
import com.authentification.payload.CommentRequest;
import com.authentification.repositories.CommentRepository;
import com.authentification.repositories.NotificationRepository;
import com.authentification.repositories.UserRepository;
import com.authentification.services.CommentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import java.time.ZonedDateTime;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {
    private final Logger log = LoggerFactory.getLogger(CommentServiceImpl.class);

    private final CommentRepository commentRepository ;
    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository ;
    private final JwtUtils jwtUtils ;


    public CommentServiceImpl (CommentRepository commentRepository,UserRepository userRepository, JwtUtils jwtUtils, NotificationRepository notificationRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.notificationRepository = notificationRepository;
        this.jwtUtils = jwtUtils;
    }

    public Comment save(CommentRequest commentRequest,Annonce annonce, String token) {
        Long id = jwtUtils.getUserIdFromToken(token);
        User user = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid user ID"));
        Comment comment = new Comment();
             comment.setText(commentRequest.getText());
             comment.setUser(user);
             comment.setAnnonce(annonce);
        if (comment.getId_comment() == null)
        {comment.setCreatedDate(ZonedDateTime.now());}
        else
        {comment.setCreatedDate(commentRequest.getCreatedDate());}
        comment.setNotificationSent(false); //Initialize the notification status*/
        commentRepository.save(comment);

        User postOwner = annonce.getUser();
        if (!user.equals(postOwner)) {
            createNotification(postOwner,comment);
        }
        return comment;

    }

    private void createNotification(User recipient, Comment comment) {
        Notification notification = new Notification();
        notification.setUser(recipient);
        notification.setMessage("You have a new comment on your post.");
        notification.setAnnonceId(comment.getAnnonce().getId_annonce());
        notification.setRead(false);
        notification.setCreatedAt(ZonedDateTime.now());
        notification.setComment(comment);
        notificationRepository.save(notification);
    }

    public List<Comment> getCommentsByAnnonceId(Long annonceId) {return commentRepository.findByAnnonceId(annonceId);}
    public void delete(Long commentId) {commentRepository.deleteById(commentId);}
}
