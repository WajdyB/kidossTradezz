package com.authentification.ServicesImp;

import com.authentification.entities.Annonce;
import com.authentification.entities.User;
import com.authentification.jwt.JwtUtils;
import com.authentification.payload.MessageResponse;
import com.authentification.repositories.AnnonceRepository;
import com.authentification.repositories.UserRepository;
import com.authentification.services.AnnonceService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
public class AnnonceServiceImpl implements AnnonceService {

    @Autowired
    private AnnonceRepository annonceRepository ;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtUtils jwtUtils ;


    public List<Map<String, Object>> getAllAnnonce() {
        List<Annonce> annonces = annonceRepository.findAll();
        List<Map<String, Object>> response = new ArrayList<>();

        for (Annonce annonce : annonces) {
            Map<String, Object> annonceMap = new HashMap<>();
            annonceMap.put("id_annonce", annonce.getId_annonce());
            annonceMap.put("name", annonce.getName());
            annonceMap.put("price", annonce.getPrice());
            annonceMap.put("type", annonce.getType());
            annonceMap.put("state", annonce.getState());
            annonceMap.put("picturePath",annonce.getPicturePath());
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
        Long id = jwtUtils.getUserIdFromToken(token);
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            return annonceRepository.findByUserAndType(user.get(), "For_Sale");
        } else {
            return Collections.emptyList();
        }
    }

    public List<Annonce> getAnnoncesForExchange(String token) {
        Long id = jwtUtils.getUserIdFromToken(token);
        Optional<User> user = userRepository.findById(id);;
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

        Long id = jwtUtils.getUserIdFromToken(token);
        Optional<User> user = userRepository.findById(id);
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
                newAnnonce.setPicturePath(fileName + modifiedDate + "." + fileExtension);
            }

            annonceRepository.save(newAnnonce);
            return ResponseEntity.ok(new MessageResponse("Annonce added successfully!"));
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Failed to add annonce."));
    }

    public ResponseEntity<MessageResponse> modifyAnnonce(Long id_annonce, Annonce newAnnonce, String token) {
        Long id = jwtUtils.getUserIdFromToken(token);
        Optional<User> user = userRepository.findById(id);

        if (user.isPresent()) {
            Optional<Annonce> annonceToUpdate = annonceRepository.findById(id_annonce);
            if (annonceToUpdate.isPresent()) {
                Annonce existingAnnonce = annonceToUpdate.get();
                if (existingAnnonce.getUser().getId_user().equals(user.get().getId_user())) {

                    if (!(newAnnonce.getName().isEmpty())) {
                        existingAnnonce.setName(newAnnonce.getName());
                    }
                    else existingAnnonce.setName(existingAnnonce.getName());

                    if (!(newAnnonce.getPrice().isEmpty())) {
                        existingAnnonce.setPrice(newAnnonce.getPrice());
                    }
                    else existingAnnonce.setPrice(existingAnnonce.getPrice());

                    if (!(newAnnonce.getType().isEmpty())) {
                        existingAnnonce.setType(newAnnonce.getType());
                    }
                    else existingAnnonce.setType(existingAnnonce.getType());

                    if (!(newAnnonce.getState().isEmpty())) {
                        existingAnnonce.setState(newAnnonce.getState());
                    }
                    else existingAnnonce.setState(existingAnnonce.getState());

                    if (!(newAnnonce.getAgeChild().isEmpty())) {
                        existingAnnonce.setAgeChild(newAnnonce.getAgeChild());
                    }
                    else existingAnnonce.setAgeChild(existingAnnonce.getAgeChild());

                    if (!(newAnnonce.getAgeToy().isEmpty())) {
                        existingAnnonce.setAgeToy(newAnnonce.getAgeToy());
                    }
                    else existingAnnonce.setAgeToy(existingAnnonce.getAgeToy());

                    if (!(newAnnonce.getCategory().isEmpty())) {
                        existingAnnonce.setCategory(newAnnonce.getCategory());
                    }
                    else existingAnnonce.setCategory(existingAnnonce.getCategory());

                    if (!(newAnnonce.getDescription().isEmpty())) {
                        existingAnnonce.setDescription(newAnnonce.getDescription());
                    }
                    else existingAnnonce.setDescription(existingAnnonce.getDescription());

                    annonceRepository.save(existingAnnonce);
                    return ResponseEntity.ok(new MessageResponse("Annonce modified successfully!"));
                }
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new MessageResponse("You are not allowed to modify this annonce."));
            }
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.badRequest().body(new MessageResponse("Failed to modify annonce."));
    }



    public ResponseEntity<MessageResponse> archiveAnnonce(Long id_annonce, String token) {
        Long id = jwtUtils.getUserIdFromToken(token);
        Optional<User> user = userRepository.findById(id);

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
