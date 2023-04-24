package com.authentification.controllers;

import com.authentification.entities.Annonce;
import com.authentification.entities.User;
import com.authentification.payload.MessageResponse;
import com.authentification.services.AnnonceService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/annonces")
public class AnnonceController {

    @Autowired
    private AnnonceService annonceService ;

    @GetMapping("/getAll")
    public List<Map<String, Object>> getAllAnnonce() {
        return annonceService.getAllAnnonce();
    }
    @GetMapping("/{category}")
    public List<Annonce> getAnnonceByCategory(@PathVariable String category) {
        return annonceService.getAnnonceByCategory(category);
    }
    @GetMapping("/{id_annonce}/user")
    public User getUserByAnnonceId(@PathVariable("id_annonce") Long id_annonce) throws NotFoundException {
            return annonceService.getAnnonceOwner(id_annonce);
    }
    @GetMapping("/for-sale")
    public List<Annonce> getAnnoncesForSale(@RequestHeader("Authorization") String token) {
      return annonceService.getAnnoncesForSale(token);
    }
    @GetMapping("/for-exchange")
    public List<Annonce> getAnnonceForExchange(@RequestHeader("Authorization") String token) {
       return annonceService.getAnnoncesForExchange(token);
    }

    @PostMapping(value="/add-annonce",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
        public ResponseEntity<MessageResponse> addAnnonce(@RequestBody Annonce annonce ,
                                                          @RequestHeader(value = "Authorization") String token) throws IOException {
            return annonceService.addAnnonce(annonce, token);
    }
    @PutMapping("/{id}/modify-annonce")
    public ResponseEntity<MessageResponse> modifyAnnonce(@PathVariable("id") Long id,
                                                         @RequestBody Annonce annonce,
                                                         @RequestHeader(value = "Authorization") String token) {
        return annonceService.modifyAnnonce(id, annonce, token);
    }
    @PutMapping("/{id}/archive-annonce")
    public ResponseEntity<MessageResponse> archiveAnnonce(@PathVariable("id") Long id,
                                                          @RequestHeader(value = "Authorization") String token) {
        return annonceService.archiveAnnonce(id, token);
    }
}


