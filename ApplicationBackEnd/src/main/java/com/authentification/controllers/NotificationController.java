package com.authentification.controllers;

import com.authentification.entities.Notification;
import com.authentification.entities.User;
import com.authentification.payload.NotificationResponse;
import com.authentification.repositories.NotificationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    private final NotificationRepository notificationRepository;

    public NotificationController(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @GetMapping("/getNotifications/{user_id}")
    public List<NotificationResponse> getUserNotifications(@PathVariable("user_id") Long userId) {
        List<Notification> notifications = notificationRepository.findByUserId(userId);

        // Create a list of custom notification response objects
        List<NotificationResponse> notificationResponses = new ArrayList<>();
        for (Notification notification : notifications) {
            NotificationResponse response = new NotificationResponse();
            response.setId(notification.getId_notification());
            response.setMessage(notification.getMessage());
            response.setAnnonceId(notification.getAnnonceId());
            response.setCreatedAt(notification.getCreatedAt());
            response.setRead(notification.isRead());

            // Set user information
            User commentUser = notification.getComment().getUser();
            response.setCommentUserId(commentUser.getId_user());
            response.setCommentUsername(commentUser.getUsername());
            notificationResponses.add(response);
        }

        return notificationResponses;
    }
}

