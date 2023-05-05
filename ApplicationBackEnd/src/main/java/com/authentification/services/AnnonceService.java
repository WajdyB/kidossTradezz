package com.authentification.services;

import com.authentification.entities.Annonce;
import com.authentification.entities.User;
import com.authentification.jwt.JwtUtils;
import com.authentification.payload.MessageResponse;
import com.authentification.repositories.AnnonceRepository;
import com.authentification.repositories.UserRepository;
import javassist.NotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
@Transactional
public class AnnonceService {

    final static Logger LOGGER = LoggerFactory.getLogger(AnnonceService.class);

    @Autowired
    private AnnonceRepository annonceRepository ;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtUtils jwtUtils ;

    @Autowired
    private Environment environment ;

    public List<Map<String, Object>> getAllAnnonce() {
        List<Annonce> annonces = annonceRepository.findAll();
        List<Map<String, Object>> response = new ArrayList<>();

        for (Annonce annonce : annonces) {
            Map<String, Object> annonceMap = new HashMap<>();
            annonceMap.put("id", annonce.getId_annonce());
            annonceMap.put("name", annonce.getName());
            annonceMap.put("price", annonce.getPrice());
            annonceMap.put("type", annonce.getType());
            annonceMap.put("state", annonce.getState());
            annonceMap.put("ageChild", annonce.getAgeChild());
            annonceMap.put("ageToy", annonce.getAgeToy());
            annonceMap.put("category", annonce.getCategory());
            annonceMap.put("description", annonce.getDescription());
            annonceMap.put("user_id", annonce.getUser().getId_user());
            response.add(annonceMap);
        }

        return response;
    }

    public Annonce getAnnonceById(Long id_annonce) throws NotFoundException {
        Optional<Annonce> annonceOptional = annonceRepository.findById(id_annonce);
        if (annonceOptional.isPresent()) {
            return annonceOptional.get();
        } else {
            throw new NotFoundException("Annonce with id " + id_annonce + " not found.");
        }
    }
    public List<Annonce> getAnnonceByCategory(String category) {
        return annonceRepository.findByCategory(category);
    }

    public User getAnnonceOwner(Long id_annonce) throws NotFoundException {
        Optional<Annonce> annonceOptional = annonceRepository.findById(id_annonce);
        if (annonceOptional.isPresent()) {
            Annonce annonce = annonceOptional.get();
            return annonce.getUser();
        } else {
            throw new NotFoundException("Annonce with id " + id_annonce + " not found.");
        }
    }

    public List<Annonce> getAnnoncesForSale(String token) {
        String username = jwtUtils.getUserNameFromJwtToken(token);
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            return annonceRepository.findByUserAndType(user.get(), "For_Sale");
        } else {
            return Collections.emptyList();
        }
    }

    public List<Annonce> getAnnoncesForExchange(String token) {
        String username = jwtUtils.getUserNameFromJwtToken(token);
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            return annonceRepository.findByUserAndType(user.get(), "For_Exchange");
        } else {
            return Collections.emptyList();
        }
    }

    public List<Annonce> getAnnoncesForSaleById(Long id_user) {
        Optional<User> user = userRepository.findById(id_user);
        if (user.isPresent()) {
            return annonceRepository.findByUserAndType(user.get(), "For_Sale");
        } else {
            return Collections.emptyList();
        }
    }

    public List<Annonce> getAnnoncesForExchangeById(Long id_user) {
        Optional<User> user = userRepository.findById(id_user);
        if (user.isPresent()) {
            return annonceRepository.findByUserAndType(user.get(), "For_Exchange");
        } else {
            return Collections.emptyList();
        }
    }


    public ResponseEntity<MessageResponse> addAnnonce(Annonce annonce, String token) throws IOException {

        String username = jwtUtils.getUserNameFromJwtToken(token);
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            Annonce newAnnonce = new Annonce();
            newAnnonce.setName(annonce.getName());
            newAnnonce.setPrice(annonce.getPrice());
            newAnnonce.setType(annonce.getType());
            newAnnonce.setState(annonce.getState());
            newAnnonce.setAgeChild(annonce.getAgeChild());
            newAnnonce.setAgeToy(annonce.getAgeToy());
            newAnnonce.setCategory(annonce.getCategory());
            newAnnonce.setDescription(annonce.getDescription());
            newAnnonce.setEstArchive(false);
            newAnnonce.setUser(user.get());

            String modifiedDate = new Date().toString().replace(':', '.');
            if (annonce.getPicture() != null) {
                String originalFilename = annonce.getPicture().getOriginalFilename();
                String fileName = originalFilename.split("\\.", 2)[0];
                String fileExtension = originalFilename.split("\\.", 2)[1];
                byte[] bytes = annonce.getPicture().getBytes();
                Path path = Paths.get("C:/pfe/kidossTradezz/ApplicationBackEnd/src/main/webapp/WEB-INF/images/annonces/" + fileName + modifiedDate + "." + fileExtension);
                Files.write(path, bytes);
                newAnnonce.setPicturePath(originalFilename);
            }

            annonceRepository.save(newAnnonce);
            return ResponseEntity.ok(new MessageResponse("Annonce added successfully!"));
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Failed to add annonce."));
    }

    public ResponseEntity<MessageResponse> modifyAnnonce(Long id_annonce, Annonce annonce, String token) {
        String username = jwtUtils.getUserNameFromJwtToken(token);
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isPresent()) {
            Optional<Annonce> annonceToUpdate = annonceRepository.findById(id_annonce);
            if (annonceToUpdate.isPresent()) {
                Annonce updatedAnnonce = annonceToUpdate.get();
                if (updatedAnnonce.getUser().getId_user().equals(user.get().getId_user())) {
                    if (annonce.getName() != null) {
                        updatedAnnonce.setName(annonce.getName());
                    }
                    if (annonce.getPrice() != null) {
                        updatedAnnonce.setPrice(annonce.getPrice());
                    }
                    if (annonce.getType() != null) {
                        updatedAnnonce.setType(annonce.getType());
                    }
                    if (annonce.getState() != null) {
                        updatedAnnonce.setState(annonce.getState());
                    }
                    if (annonce.getAgeChild() != null) {
                        updatedAnnonce.setAgeChild(annonce.getAgeChild());
                    }
                    if (annonce.getAgeToy() != null) {
                        updatedAnnonce.setAgeToy(annonce.getAgeToy());
                    }
                    if (annonce.getCategory() != null) {
                        updatedAnnonce.setCategory(annonce.getCategory());
                    }
                    if (annonce.getDescription() != null) {
                        updatedAnnonce.setDescription(annonce.getDescription());
                    }
                    annonceRepository.save(updatedAnnonce);
                    return ResponseEntity.ok(new MessageResponse("Annonce modified successfully!"));
                }
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new MessageResponse("You are not allowed to modify this annonce."));
            }
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Failed to modify annonce."));
    }


    public ResponseEntity<MessageResponse> archiveAnnonce(Long id_annonce, String token) {
        String username = jwtUtils.getUserNameFromJwtToken(token);
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isPresent()) {
            Optional<Annonce> annonceToArchive = annonceRepository.findById(id_annonce);
            if (annonceToArchive.isPresent()) {
                Annonce archivedAnnonce = annonceToArchive.get();
                if (archivedAnnonce.getUser().getId_user().equals(user.get().getId_user())) {
                    archivedAnnonce.setEstArchive(true);
                    annonceRepository.save(archivedAnnonce);
                    return ResponseEntity.ok(new MessageResponse("Annonce archived successfully!"));
                }
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new MessageResponse("You are not allowed to archive this annonce."));
            }
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Failed to archive annonce."));
    }

}



