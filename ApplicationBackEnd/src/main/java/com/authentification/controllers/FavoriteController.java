package com.authentification.controllers;

import com.authentification.entities.Annonce;
import com.authentification.entities.Favorite;
import com.authentification.entities.User;
import com.authentification.jwt.JwtUtils;
import com.authentification.payload.MessageResponse;
import com.authentification.services.FavoriteService;
import com.authentification.services.AnnonceService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;


@CrossOrigin(origins = "http://localhost:3004")
@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {
    @Autowired
    private FavoriteService favoriteService;
    @Autowired
    private AnnonceService annonceService;
    @Autowired
    private JwtUtils jwtUtils ;

    @GetMapping("/{id_user}/get-all-favorites")
    public List<Favorite> getAllFavorites(@PathVariable Long id_user) {
        return favoriteService.getAllFavorites(id_user);
    }

    @PostMapping("/{id_annonce}/add-to-favorites")
    public ResponseEntity<?> addToFavorites(@PathVariable Long id_annonce, HttpServletRequest request) throws NotFoundException {
        String token = request.getHeader("Authorization").substring(7);
        Long userId = jwtUtils.getUserIdFromToken(token);
        //System.out.println("USERID"+userId);
        Annonce annonce = annonceService.getAnnonceById(id_annonce);
        favoriteService.addToFavorites(annonce, userId);
        return ResponseEntity.ok(new MessageResponse("Annonce added to favorites successfully!"));
    }

    @DeleteMapping("/{id_annonce}/remove-from-favorites")
    public void removeFromFavorites(@AuthenticationPrincipal User user, @PathVariable Long id_annonce) throws NotFoundException {
        Annonce annonce = annonceService.getAnnonceById(id_annonce);
        favoriteService.removeFromFavorites(user, annonce);
    }

}


