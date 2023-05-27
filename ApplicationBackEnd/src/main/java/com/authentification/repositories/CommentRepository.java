package com.authentification.repositories;

import com.authentification.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("select c from Comment c "
            + " where c.annonce.id_annonce = :annonceId")
    List<Comment> findByAnnonceId(Long annonceId);
}
