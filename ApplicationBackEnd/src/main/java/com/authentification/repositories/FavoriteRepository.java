package com.authentification.repositories;

import com.authentification.entities.Annonce;
import com.authentification.entities.Favorite;
import com.authentification.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface FavoriteRepository extends JpaRepository<Favorite,Long> {

    @Query(value = "Select * FROM favorites WHERE user_id = ?", nativeQuery = true)
    List<Favorite> findByUserId(Long user_id);
    @Query("SELECT f FROM Favorite f WHERE f.user = :user AND f.annonce.id_annonce = :annonceId")
    Optional<Favorite> findByUserAndAnnonceId(@Param("user") User user, @Param("annonceId") Long annonceId);
    Optional<Favorite> findByUserAndAnnonce(User user , Annonce annonce) ;
    List<Favorite> findByAnnonce(Annonce annonce);
    List<Favorite> findByUser(User user) ;
}