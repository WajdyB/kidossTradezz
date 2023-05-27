package com.authentification.controllers;

import com.authentification.ServicesImp.AnnonceServiceImpl;
import com.authentification.entities.Annonce;
import com.authentification.entities.User;
import com.authentification.payload.MessageResponse;
import com.fasterxml.jackson.annotation.JsonIgnore;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.IOException;
import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "http://localhost:3000",maxAge = 3600)
@RestController
@RequestMapping("/api/annonces")
public class AnnonceController {

    @Autowired
    private AnnonceServiceImpl annonceService ;

    @GetMapping("/get-all-annonces")
    public List<Map<String, Object>> getAllAnnonce() {
        return annonceService.getAllAnnonce();
    }
    @GetMapping("/{id_annonce}/get-annonce")
    public Annonce getAnnonceById (@PathVariable("id_annonce") Long id_annonce) throws NotFoundException  {
        return annonceService.getAnnonceById(id_annonce) ;
    }
    @GetMapping("/get-annonce/{category}")
    public List<Annonce> getAnnonceByCategory(@PathVariable String category) {
        return annonceService.getAnnonceByCategory(category);
    }

    @GetMapping("/get-annonce-by-user/{id_user}")
    public List<Annonce> getAnnonceByUserId(@PathVariable Long id_user) {
        return annonceService.getAnnonceByUserId(id_user);
    }
    @GetMapping("/{id_annonce}/get-user")
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

    @GetMapping("/{id_user}/for-sale")
    public List<Annonce>getAnnonceForSaleById(@PathVariable("id_user") Long id_user) {
        return annonceService.getAnnoncesForSaleById(id_user) ;
    }

    @GetMapping("/{id_user}/for-exchange")
    public List<Annonce>getAnnonceForExchangeById(@PathVariable("id_user") Long id_user) {
        return annonceService.getAnnoncesForExchangeById(id_user) ;
    }

    @PostMapping(value="/add-annonce",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<MessageResponse> addAnnonce(@ModelAttribute Annonce annonce ,
                                                      @RequestHeader(value = "Authorization") String token) throws IOException {
        return annonceService.addAnnonce(annonce, token);
    }

    @PutMapping("/{id_annonce}/modify-annonce")
    public ResponseEntity<MessageResponse> modifyAnnonce(@PathVariable("id_annonce") Long id_annonce,
                                                         @RequestBody Annonce annonce,
                                                         @RequestHeader(value = "Authorization") String token) {
        return annonceService.modifyAnnonce(id_annonce, annonce, token);
    }
    @PutMapping("/{id_annonce}/archive-annonce")
    public ResponseEntity<MessageResponse> archiveAnnonce(@PathVariable("id_annonce") Long id_annonce,
                                                          @RequestHeader(value = "Authorization") String token) {
        return annonceService.archiveAnnonce(id_annonce, token);
    }
}