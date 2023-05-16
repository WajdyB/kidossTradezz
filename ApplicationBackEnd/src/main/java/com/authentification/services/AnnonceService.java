package com.authentification.services;

import com.authentification.entities.Annonce;
import com.authentification.entities.User;
import com.authentification.payload.MessageResponse;
import javassist.NotFoundException;
import org.springframework.http.ResponseEntity;
import java.io.IOException;
import java.util.*;


public interface AnnonceService {
     List<Map<String, Object>> getAllAnnonce();
     Annonce getAnnonceById(Long id_annonce) throws NotFoundException ;
     List<Annonce> getAnnonceByCategory(String category) ;
     User getAnnonceOwner(Long id_annonce) throws NotFoundException ;
     List<Annonce> getAnnoncesForSale(String token) ;
     List<Annonce> getAnnoncesForExchange(String token) ;
     List<Annonce> getAnnoncesForSaleById(Long id_user) ;
     List<Annonce> getAnnoncesForExchangeById(Long id_user) ;
     ResponseEntity<MessageResponse> addAnnonce(Annonce annonce, String token) throws IOException ;
     ResponseEntity<MessageResponse> modifyAnnonce(Long id_annonce, Annonce newAnnonce, String token) ;
     ResponseEntity<MessageResponse> archiveAnnonce(Long id_annonce, String token) ;
}



