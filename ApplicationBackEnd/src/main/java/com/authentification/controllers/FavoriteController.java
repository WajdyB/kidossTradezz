package com.authentification.controllers;

import com.authentification.ServicesImp.AnnonceServiceImpl;
import com.authentification.ServicesImp.FavoriteServiceImpl;
import com.authentification.entities.Annonce;
import com.authentification.entities.Favorite;
import com.authentification.jwt.JwtUtils;
import com.authentification.payload.MessageResponse;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import java.util.List;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {
    @Autowired
    private FavoriteServiceImpl favoriteService;
    @Autowired
    private AnnonceServiceImpl annonceService;
    @Autowired
    private JwtUtils jwtUtils ;

    @GetMapping("/{id_user}/get-all-favorites")
    public List<Favorite> getAllFavorites(@PathVariable("id_user")  Long id_user) {
        return favoriteService.getAllFavorites(id_user);
    }

    @PostMapping("/{id_annonce}/add-to-favorites")
    public ResponseEntity<?> addToFavorites(@PathVariable("id_annonce")  Long id_annonce, HttpServletRequest request) throws NotFoundException {
        String token = request.getHeader("Authorization").substring(7);
        Long userId = jwtUtils.getUserIdFromToken(token);
        Annonce annonce = annonceService.getAnnonceById(id_annonce);
        favoriteService.addToFavorites(annonce, userId);
        return ResponseEntity.ok(new MessageResponse("Annonce added to favorites successfully!"));
    }

    @DeleteMapping("/{id_annonce}/remove-from-favorites")
    public ResponseEntity<String> removeFromFavorites(@PathVariable("id_annonce") Long id_annonce, Long id_user) {
        try {
            favoriteService.removeFromFavorites(id_annonce,id_user);
            return new ResponseEntity<>("Announce removed from favorites", HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}


