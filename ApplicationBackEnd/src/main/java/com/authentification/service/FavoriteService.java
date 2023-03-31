package com.authentification.service;

import com.authentification.entities.Annonce;
import com.authentification.entities.Favorite;
import com.authentification.entities.User;
import com.authentification.repositories.AnnonceRepository;
import com.authentification.repositories.FavoriteRepository;
import com.authentification.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Optional;

@Service
public class FavoriteService {
   @Autowired
    private FavoriteRepository favoriteRepository;
   @Autowired
   private AnnonceRepository annonceRepository;
   @Autowired
   private UserRepository userRepository ;

        public List<Favorite> getAllFavorites(Long id_user) {
        return favoriteRepository.findByUserId(id_user);
    }

    public void addToFavorites(Annonce annonce, HttpSession session) {
       Long id = (Long) session.getAttribute("id");
       if (id == null) {
            throw new IllegalArgumentException("User ID cannot be null!");
       }
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            Optional<Favorite> existingFavorite = favoriteRepository.findByUserAndAnnonce(user.get(), annonce);
            if (existingFavorite.isPresent()) {
                throw new IllegalStateException("This annonce is already in the user's favorites!");
            }
            Favorite favorite = new Favorite();
            favorite.setUser(user.get());
            favorite.setAnnonce(annonce);
            favoriteRepository.save(favorite);
        }
    }

    public void removeFromFavorites(User user, Annonce annonce) {
        Optional<Favorite> existingFavorite = favoriteRepository.findByUserAndAnnonce(user, annonce);
        if (existingFavorite.isPresent()) {
            favoriteRepository.delete(existingFavorite.get());
        } else {
            throw new IllegalStateException("This annonce is not in the user's favorites!");
        }

    }

}
