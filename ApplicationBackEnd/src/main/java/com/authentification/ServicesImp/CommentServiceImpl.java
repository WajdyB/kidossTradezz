package com.authentification.ServicesImp;

import com.authentification.entities.Annonce;
import com.authentification.entities.Comment;
import com.authentification.entities.User;
import com.authentification.jwt.JwtUtils;
import com.authentification.payload.CommentRequest;
import com.authentification.repositories.AnnonceRepository;
import com.authentification.repositories.CommentRepository;
import com.authentification.repositories.UserRepository;
import com.authentification.services.CommentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class CommentServiceImpl implements CommentService {
    private final Logger log = LoggerFactory.getLogger(CommentServiceImpl.class);

    private final CommentRepository commentRepository ;
    private final UserRepository userRepository;
    private final JwtUtils jwtUtils ;


    public CommentServiceImpl (CommentRepository commentRepository,UserRepository userRepository, JwtUtils jwtUtils) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
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
        commentRepository.save(comment);
        return comment;



    }
    public List<Comment> getCommentsByAnnonceId(Long annonceId) {return commentRepository.findByAnnonceId(annonceId);}
    public void delete(Long commentId) {commentRepository.deleteById(commentId);}
}
