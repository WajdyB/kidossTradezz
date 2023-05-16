package com.authentification.repositories;

import com.authentification.entities.Annonce;
import com.authentification.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnonceRepository extends JpaRepository<Annonce,Long> {
    List<Annonce> findByCategory(String category);
    List<Annonce> findByUserAndType(User user, String type);
    List<Annonce> findByUser(User user);

}

