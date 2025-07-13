package com.harmony.notificationservice.repository;

import com.harmony.notificationservice.model.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends MongoRepository<Notification, String> {
    
    List<Notification> findByUserId(String userId);
    
    List<Notification> findByUserIdAndIsRead(String userId, boolean isRead);
    
    List<Notification> findByType(String type);
    
    List<Notification> findByPriority(String priority);
} 