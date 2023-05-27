package com.authentification.repositories;

import com.authentification.entities.Annonce;
import com.authentification.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnonceRepository extends JpaRepository<Annonce,Long> {

    List<Annonce> findByCategory(String category);
    List<Annonce> findByUserAndType(User user, String type);
    List<Annonce> findByUser(User user);
    @Query("SELECT f FROM Annonce f WHERE f.user.id_user = :id_user")
    List<Annonce> findByUserId(@Param("id_user") Long id_user);
    @Query("SELECT a FROM Annonce a WHERE a.id_annonce = :annonceId")
    Annonce getById(Long annonceId);
}

