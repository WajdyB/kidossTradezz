package com.authentification.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;


@RestController
@RequestMapping("/upload")
public class ImageController {
    static String Annoncepath = "src/main/webapp/WEB-INF/images/annonces/";
    static String Profilepath = "src/main/webapp/WEB-INF/images/profiles/";

    final static Logger LOGGER = LoggerFactory.getLogger(ImageController.class);

    @PostMapping("/profilePictures/upload")
    public void sax(@RequestParam("profilePicture") MultipartFile profilePicture) throws Exception {
        BufferedImage image = ImageIO.read(profilePicture.getInputStream());
        String fileName = Profilepath + profilePicture.getOriginalFilename();
        try (OutputStream os = new FileOutputStream(fileName)) {
            ImageIO.write(image, "png", os);
            LOGGER.info("Profile picture saved as " + fileName);
        } catch (IOException e) {
            LOGGER.error(e.getMessage());
        }
    }

}

