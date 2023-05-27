package com.authentification.controllers;

import com.authentification.ServicesImp.RatingServiceImpl;
import com.authentification.payload.RatingRequest;
import com.authentification.payload.RatingResponse;
import com.authentification.payload.TopRatedUserResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
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

    @GetMapping("/top-rated")
    public ResponseEntity<List<TopRatedUserResponse>> getTopRatedUsers() {
        int limit = 1; // Specify the desired number of top-rated users to fetch

        List<TopRatedUserResponse> topRatedUsers = ratingService.getTopRatedUsers(limit);

        return ResponseEntity.status(HttpStatus.OK).body(topRatedUsers);
    }
}