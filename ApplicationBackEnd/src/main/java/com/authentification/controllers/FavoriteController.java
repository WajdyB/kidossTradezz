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
    public ResponseEntity<?> addToFavorites(@PathVariable("id_annonce")  Long id_annonce,
                                            @RequestHeader("Authorization") String token) throws NotFoundException {
        Long userId = jwtUtils.getUserIdFromToken(token);
        Annonce annonce = annonceService.getAnnonceById(id_annonce);
        favoriteService.addToFavorites(annonce, userId,token);
        return ResponseEntity.ok(new MessageResponse("Annonce added to favorites successfully!"));
    }

    @DeleteMapping("/{id_annonce}/remove-from-favorites")
    public ResponseEntity<MessageResponse> removeFromFavorites(@PathVariable("id_annonce") Long id_annonce,
                                                               @RequestHeader("Authorization") String token) {
        try {
            favoriteService.removeFromFavorites(id_annonce, token);
            return ResponseEntity.ok(new MessageResponse("Annonce removed from favorites successfully!"));
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Failed to remove annonce from favorites: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse("Failed to remove annonce from favorites: " + e.getMessage()));
        }
    }


}


