package com.authentification.controllers;

import com.authentification.ServicesImp.RatingServiceImpl;
import com.authentification.payload.RatingRequest;
import com.authentification.payload.RatingResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ratings")
public class RatingController {

    private final RatingServiceImpl ratingService;

    public RatingController(RatingServiceImpl ratingService) {
        this.ratingService = ratingService;
    }

    @PostMapping
    public ResponseEntity<?> createRating( @RequestHeader("Authorization") String token,
                                           @RequestBody RatingRequest ratingRequest) {
        ratingService.createRating(ratingRequest,token);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<RatingResponse>> getRatingsForUser(@PathVariable Long userId) {
        List<RatingResponse> ratings = ratingService.getRatingsForUser(userId);
        return ResponseEntity.ok(ratings);
    }

    @GetMapping("/average/{userId}")
    public ResponseEntity<Double> getAverageRatingForUser(@PathVariable Long userId) {
        Double averageRating = ratingService.getAverageRatingForUser(userId);
        return ResponseEntity.ok(averageRating);
    }
}

