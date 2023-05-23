package com.authentification.ServicesImp;

import com.authentification.entities.Rating;
import com.authentification.entities.User;
import com.authentification.jwt.JwtUtils;
import com.authentification.payload.RatingRequest;
import com.authentification.payload.RatingResponse;
import com.authentification.payload.TopRatedUserResponse;
import com.authentification.repositories.RatingRepository;
import com.authentification.repositories.UserRepository;
import com.authentification.services.RatingService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RatingServiceImpl implements RatingService {

    private final RatingRepository ratingRepository;
    private final UserRepository userRepository;

    private final JwtUtils jwtUtils ;
    public RatingServiceImpl(RatingRepository ratingRepository , UserRepository userRepository , JwtUtils jwtUtils) {
        this.ratingRepository = ratingRepository;
        this.userRepository = userRepository ;
        this.jwtUtils = jwtUtils ;
    }

    public void createRating(RatingRequest ratingRequest , String token) {
        Long id = jwtUtils.getUserIdFromToken(token);
        //Optional<User> user = userRepository.findByUsername(username);
        User ratedUser = userRepository.findById_user(ratingRequest.getRatedUserId())
                .orElseThrow(() -> new IllegalArgumentException("Rated user not found."));

        User ratingUser = userRepository.findById_user(ratingRequest.getRatingUserId())
                .orElseThrow(() -> new IllegalArgumentException("Rating user not found."));

        Rating rating = new Rating();
        rating.setRatedUser(ratedUser);
        rating.setRatingUser(ratingUser);
        rating.setRatingValue(ratingRequest.getRatingValue());
        rating.setComment(ratingRequest.getComment());

        ratingRepository.save(rating);
    }

    public List<RatingResponse> getRatingsForUser(Long id_user) {
        List<Rating> ratings = ratingRepository.findByRatedUserId(id_user);
        return mapRatingsToResponses(ratings);
    }

    public Double getAverageRatingForUser(Long id_user) {
        return ratingRepository.calculateAverageRatingByRatedUser_Id(id_user);
    }

    public List<RatingResponse> mapRatingsToResponses(List<Rating> ratings) {
        return ratings.stream()
                .map(rating -> new RatingResponse(
                        rating.getId(),
                        rating.getRatingValue(),
                        rating.getComment()
                ))
                .collect(Collectors.toList());
    }

    public List<TopRatedUserResponse> getTopRatedUsers(int limit) {
        Pageable pageable = PageRequest.of(0, limit);
        List<Object[]> topRatedUsers = ratingRepository.findTopRatedUsers(pageable);

        return topRatedUsers.stream()
                .map(result -> {
                    Long userId = (Long) result[0];
                    String username = (String) result[1];
                    Double averageRating = (Double) result[2];

                    return new TopRatedUserResponse(userId, username, averageRating);
                })
                .collect(Collectors.toList());
    }
}

