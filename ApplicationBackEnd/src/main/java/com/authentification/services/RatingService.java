package com.authentification.services;

import com.authentification.entities.Rating;
import com.authentification.payload.RatingRequest;
import com.authentification.payload.RatingResponse;

import java.util.List;

public interface RatingService {

    void createRating(RatingRequest ratingRequest, String token);
    List<RatingResponse> getRatingsForUser(Long id_user);
    Double getAverageRatingForUser(Long id_user);
    List<RatingResponse> mapRatingsToResponses(List<Rating> ratings);

}
