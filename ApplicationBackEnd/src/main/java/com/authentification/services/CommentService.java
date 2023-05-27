package com.authentification.services;

import com.authentification.entities.Annonce;
import com.authentification.entities.Comment;
import com.authentification.payload.CommentRequest;
import java.util.List;

public interface CommentService {

     Comment save(CommentRequest commentRequest, Annonce annonce, String token);
     List<Comment> getCommentsByAnnonceId(Long annonceId);
     void delete(Long commentId);
}
