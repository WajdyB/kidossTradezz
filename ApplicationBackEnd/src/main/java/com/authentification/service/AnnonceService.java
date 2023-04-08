package com.authentification.service;

import com.authentification.entities.Annonce;
import com.authentification.entities.User;
import com.authentification.payload.MessageResponse;
import com.authentification.repositories.AnnonceRepository;
import com.authentification.repositories.UserRepository;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AnnonceService {

    @Autowired
    private AnnonceRepository annonceRepository ;
    @Autowired
    private UserRepository userRepository;

<<<<<<< HEAD
=======
    /***
     * Api for getting annonce by ID
     * @param id_annonce
     * @return
     * @throws NotFoundException
     */
    public Annonce getAnnonceById(Long id_annonce) throws NotFoundException {
        Optional<Annonce> annonceOptional = annonceRepository.findById(id_annonce);
        if (annonceOptional.isPresent()) {
            return annonceOptional.get();
        } else {
            throw new NotFoundException("Annonce with id " + id_annonce + " not found.");
        }
    }

    public List<Annonce> getAllAnnonce() {
        return annonceRepository.findAll();
    }

    public List<Annonce> getAnnonceByCategory(String category) {
        return annonceRepository.findByCategory(category);
    }


>>>>>>> 1b8fbaf83f5cfee5d20eddcd1b9420a49fd48412
    public ResponseEntity<MessageResponse> addAnnonce (Annonce annonce, HttpSession session) {

        Annonce newAnnonce =new Annonce();
        newAnnonce.setName(annonce.getName());
        newAnnonce.setPicture(annonce.getPicture());
        newAnnonce.setPrice(annonce.getPrice());
        newAnnonce.setState(annonce.getState());
        newAnnonce.setAgeChild(annonce.getAgeChild());
        newAnnonce.setAgeToy(annonce.getAgeToy());
        newAnnonce.setCategory(annonce.getCategory());
        newAnnonce.setDescription(annonce.getDescription());
        newAnnonce.setEstArchive(false);
        Long id = (Long) session.getAttribute("id");

        Optional<User> user=userRepository.findById(id);
        if (user.isPresent()){
            newAnnonce.setUser(user.get());
            annonceRepository.save(newAnnonce);
<<<<<<< HEAD
            return ResponseEntity.ok(new MessageResponse("Added successfully!"));
=======
            return ResponseEntity.ok(new MessageResponse("Annonce Added successfully!"));
>>>>>>> 1b8fbaf83f5cfee5d20eddcd1b9420a49fd48412

        }
        return (ResponseEntity<MessageResponse>) ResponseEntity.badRequest();
    }

<<<<<<< HEAD
=======
    /***
     * Api for modifying an existent annonce
     * @param id_annonce
     * @param annonce
     * @param user
     * @return
     */

>>>>>>> 1b8fbaf83f5cfee5d20eddcd1b9420a49fd48412
    public ResponseEntity<MessageResponse> modifyAnnonce(Long id_annonce , Annonce annonce, User user) {
        Annonce annonceExistent = annonceRepository.findById(id_annonce).orElse(null) ;
        if ( annonceExistent == null) {
            return ResponseEntity.badRequest().body(new MessageResponse("Annonce Not found")) ;
        }
<<<<<<< HEAD
        annonceExistent.setName(annonce.getName());
        annonceExistent.setPicture(annonce.getPicture());
        annonceExistent.setPrice(annonce.getPrice());
        annonceExistent.setState(annonce.getState());
        annonceExistent.setAgeChild(annonce.getAgeChild());
        annonceExistent.setAgeToy(annonce.getAgeToy());
        annonceExistent.setCategory(annonce.getCategory());
        annonceExistent.setDescription(annonce.getDescription());
=======
               annonceExistent.setName(annonce.getName());
               annonceExistent.setPicture(annonce.getPicture());
               annonceExistent.setPrice(annonce.getPrice());
               annonceExistent.setState(annonce.getState());
               annonceExistent.setAgeChild(annonce.getAgeChild());
               annonceExistent.setAgeToy(annonce.getAgeToy());
               annonceExistent.setCategory(annonce.getCategory());
               annonceExistent.setDescription(annonce.getDescription());
>>>>>>> 1b8fbaf83f5cfee5d20eddcd1b9420a49fd48412
        try {
            annonceRepository.save(annonceExistent);
            return ResponseEntity.ok(new MessageResponse("Modified successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Not modified"));
        }
    }

    /***
     * Api for archiving an annonce
     * @param id_annonce
     * @return
     */

    public Annonce archiveAnnonce(Long id_annonce) {
        Annonce annonce = annonceRepository.findById(id_annonce).orElse(null) ;
        if (annonce == null) {
            return null ;
        }
        annonce.setEstArchive(true);
        return annonceRepository.save(annonce);
    }

    /***
     * Api for getting an annonce object by annonce_id
     * @param id_annonce
     * @return
     * @throws NotFoundException
     */

}
