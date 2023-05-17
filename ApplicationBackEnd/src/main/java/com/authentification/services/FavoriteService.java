package com.authentification.services;

import com.authentification.entities.Annonce;
import com.authentification.entities.Favorite;
import com.authentification.entities.User;
import com.authentification.jwt.JwtUtils;
import com.authentification.repositories.FavoriteRepository;
import com.authentification.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public interface FavoriteService {
     List<Favorite> getAllFavorites(Long id_user);
     void addToFavorites(Annonce annonce, Long userId,String token);
     void removeFromFavorites(Long id_annonce, String token);
}
