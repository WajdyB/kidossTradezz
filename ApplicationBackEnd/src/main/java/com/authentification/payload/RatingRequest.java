package com.authentification.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RatingRequest {
    private Long ratedUserId;
    private Long ratingUserId;
    private int ratingValue;
    private String comment;
}
