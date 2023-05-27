package com.authentification.payload;

import lombok.Getter;
import lombok.Setter;

import java.time.ZonedDateTime;

@Getter
@Setter
public class CommentRequest {
    private Long userId ;
    private Long annonceId ;
    private String text;
    private ZonedDateTime createdDate;

}
