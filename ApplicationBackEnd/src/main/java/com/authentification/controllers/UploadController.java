package com.authentification.controllers;

import org.apache.commons.io.FilenameUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;


@RestController
@RequestMapping("/upload")
public class UploadController {

        private static final Logger LOGGER = LoggerFactory.getLogger(UploadController.class);

        /**
         * By default, the public folder in the working directory is a static resource directory, which can be accessed directly by the client.
         */
        private static final Path PUBLIC_DIR = Paths.get(System.getProperty("user.dir"), "public");

        @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
        public String upload (HttpServletRequest request) throws IOException, ServletException {

            for (var part : request.getParts()) {

                // The name of the file is the relative path of the file in the client folder
                // Convert the client path separator to the server file path separator.
                String fileName = FilenameUtils.separatorsToSystem(part.getSubmittedFileName());

                // Resolve the absolute path to the file based on the public folder
                Path file = PUBLIC_DIR.resolve(fileName);

                // Try to create the folder where the file is located
                if (Files.notExists(file.getParent())) {
                    Files.createDirectories(file.getParent());
                }

                // Write data to file
                try (var inputStream = part.getInputStream()){
                    Files.copy(inputStream, file, StandardCopyOption.REPLACE_EXISTING);
                }

                LOGGER.info("write file: [{}] {}", part.getSize(), file);
            }
            return "ok";
        }
}