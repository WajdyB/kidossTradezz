package com.authentification.ServicesImp;

import com.authentification.entities.Annonce;
import com.authentification.entities.Favorite;
import com.authentification.entities.User;
import com.authentification.jwt.JwtUtils;
import com.authentification.repositories.FavoriteRepository;
import com.authentification.repositories.UserRepository;
import com.authentification.services.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class FavoriteServiceImpl implements FavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepository;
    @Autowired
    private UserRepository userRepository ;

    @Autowired
    private JwtUtils jwtUtils ;

    public List<Favorite> getAllFavorites(Long id_user) {
        return favoriteRepository.findByUserId(id_user);
    }


    public void addToFavorites(Annonce annonce, Long userId , String token) {
        if (userId == null) {
            throw new IllegalArgumentException("User ID cannot be null!");
        }
        Long id = jwtUtils.getUserIdFromToken(token);
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            Optional<Favorite> existingFavorite = favoriteRepository.findByUserAndAnnonce(user.get(), annonce);
            if (existingFavorite.isPresent()) {
                throw new IllegalStateException("This annonce is already in the user's favorites!");
            }
            Favorite favorite = new Favorite();
            favorite.setUser(user.get());
            favorite.setAnnonce(annonce);
            favorite.setDateAdded(new Date());
            favoriteRepository.save(favorite);
        }
    }

    public void removeFromFavorites(Long id_annonce, String token) {
        Long id = jwtUtils.getUserIdFromToken(token);
        if (id == null) {
            throw new IllegalArgumentException("User ID cannot be null!");
        }
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            Optional<Favorite> existingFavorite = favoriteRepository.findByUserAndAnnonceId(user.get(), id_annonce);
            if (existingFavorite.isPresent()) {
                favoriteRepository.deleteById(existingFavorite.get().getFavorite_id());
            } else {
                throw new IllegalStateException("This annonce is not in the user's favorites!");
            }
        }
    }

}

