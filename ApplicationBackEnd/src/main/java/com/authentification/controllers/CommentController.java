package com.authentification.controllers;

import com.authentification.ServicesImp.AnnonceServiceImpl;
import com.authentification.ServicesImp.CommentServiceImpl;
import com.authentification.entities.Annonce;
import com.authentification.entities.Comment;
import com.authentification.entities.User;
import com.authentification.payload.CommentRequest;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentServiceImpl commentService;
    @Autowired
        private AnnonceServiceImpl annonceService;

    @PostMapping("/createComment/{id_annonce}")
    public ResponseEntity<Comment> createComment (@PathVariable("id_annonce")  Long id_annonce,
                                                  @RequestHeader("Authorization") String token,
                                                  @RequestBody CommentRequest commentRequest) throws NotFoundException {
        Annonce annonce = annonceService.getAnnonceById(id_annonce);
        Comment comment = commentService.save(commentRequest,annonce,token);
        return ResponseEntity.ok(comment);
    }

    @GetMapping("get/{id_annonce}")
    public ResponseEntity<List<Comment>> getCommentsByAnnonce(@PathVariable("id_annonce") Long annonceId) {
        List<Comment> comments = commentService.getCommentsByAnnonceId(annonceId);
        return ResponseEntity.ok(comments);
    }

    @DeleteMapping("{commentId}")
    public ResponseEntity<?> deleteComment (@PathVariable Long commentId) {
        try {
            commentService.delete(commentId);
            return ResponseEntity.ok("Comment deleted");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }
}
