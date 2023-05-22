package com.authentification.services;

import com.authentification.entities.Rating;
import com.authentification.payload.RatingRequest;
import com.authentification.payload.RatingResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface RatingService {

    ResponseEntity<?> createRating(RatingRequest ratingRequest, String token);
    List<RatingResponse> getRatingsForUser(Long id_user);
    Double getAverageRatingForUser(Long id_user);
    List<RatingResponse> mapRatingsToResponses(List<Rating> ratings);

}
