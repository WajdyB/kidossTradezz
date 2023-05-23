package com.authentification.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TopRatedUserResponse {
    private Long userId;
    private String username;
    private Double averageRating;

    public TopRatedUserResponse(Long userId, String username, Double averageRating) {
        this.userId = userId;
        this.username = username;
        this.averageRating = averageRating;
    }
}

