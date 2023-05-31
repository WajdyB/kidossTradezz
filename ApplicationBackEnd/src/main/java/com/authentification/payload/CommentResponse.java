package com.authentification.payload;

import lombok.Data;
import java.time.ZonedDateTime;

@Data
public class CommentResponse {
    private Long id_comment;
    private ZonedDateTime createdDate;
    private String text;

    private Long user_id;
    private Long annonce_id;
}
