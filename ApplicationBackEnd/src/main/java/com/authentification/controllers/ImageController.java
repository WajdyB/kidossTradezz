package com.authentification.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;


@RestController
@RequestMapping("/image")
public class ImageController {
    static String Annoncepath = "src/main/java/resources/images/";
    static String Profilepath = "src/main/java/resources/static/images/";

    @PostMapping("/profilePictures/upload")
    public void sax(@RequestParam("profilePicture") MultipartFile profilePicture) throws Exception {
        BufferedImage image = ImageIO.read(profilePicture.getInputStream());
        String fileName = Profilepath + profilePicture.getOriginalFilename();
        try (OutputStream os = new FileOutputStream(fileName)) {
            ImageIO.write(image, "png", os);
        } catch (IOException e) {}
    }

}

