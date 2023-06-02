package com.authentification.payload;

import lombok.Getter;
import lombok.Setter;

import java.time.ZonedDateTime;

@Getter
@Setter
public class NotificationResponse {
    private Long id;
    private String message;
    private Long annonceId;
    private ZonedDateTime createdAt;
    private boolean read;
    private Long commentUserId;
    private String commentUsername;

    // Add getters and setters for all the fields

    // Optional: Add any additional constructors or methods as needed
}

