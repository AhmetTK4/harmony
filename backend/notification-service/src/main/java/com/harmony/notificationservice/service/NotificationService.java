package com.harmony.notificationservice.service;

import com.harmony.notificationservice.dto.NotificationDto;
import com.harmony.notificationservice.model.Notification;
import com.harmony.notificationservice.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class NotificationService {
    
    @Autowired
    private NotificationRepository notificationRepository;
    
    public List<NotificationDto> getAllNotifications() {
        return notificationRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public Optional<NotificationDto> getNotificationById(String id) {
        return notificationRepository.findById(id)
                .map(this::convertToDto);
    }
    
    public NotificationDto createNotification(NotificationDto notificationDto) {
        Notification notification = convertToEntity(notificationDto);
        notification.setCreatedAt(LocalDateTime.now());
        notification.setUpdatedAt(LocalDateTime.now());
        Notification savedNotification = notificationRepository.save(notification);
        return convertToDto(savedNotification);
    }
    
    public Optional<NotificationDto> updateNotification(String id, NotificationDto notificationDto) {
        return notificationRepository.findById(id)
                .map(existingNotification -> {
                    existingNotification.setUserId(notificationDto.getUserId());
                    existingNotification.setTitle(notificationDto.getTitle());
                    existingNotification.setMessage(notificationDto.getMessage());
                    existingNotification.setType(notificationDto.getType());
                    existingNotification.setRead(notificationDto.isRead());
                    existingNotification.setPriority(notificationDto.getPriority());
                    existingNotification.setUpdatedAt(LocalDateTime.now());
                    return convertToDto(notificationRepository.save(existingNotification));
                });
    }
    
    public boolean deleteNotification(String id) {
        if (notificationRepository.existsById(id)) {
            notificationRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public List<NotificationDto> getNotificationsByUserId(String userId) {
        return notificationRepository.findByUserId(userId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<NotificationDto> getUnreadNotificationsByUserId(String userId) {
        return notificationRepository.findByUserIdAndIsRead(userId, false).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public Optional<NotificationDto> markAsRead(String id) {
        return notificationRepository.findById(id)
                .map(notification -> {
                    notification.setRead(true);
                    notification.setUpdatedAt(LocalDateTime.now());
                    return convertToDto(notificationRepository.save(notification));
                });
    }
    
    private NotificationDto convertToDto(Notification notification) {
        NotificationDto dto = new NotificationDto();
        dto.setId(notification.getId());
        dto.setUserId(notification.getUserId());
        dto.setTitle(notification.getTitle());
        dto.setMessage(notification.getMessage());
        dto.setType(notification.getType());
        dto.setRead(notification.isRead());
        dto.setPriority(notification.getPriority());
        return dto;
    }
    
    private Notification convertToEntity(NotificationDto dto) {
        Notification notification = new Notification();
        notification.setUserId(dto.getUserId());
        notification.setTitle(dto.getTitle());
        notification.setMessage(dto.getMessage());
        notification.setType(dto.getType());
        notification.setRead(dto.isRead());
        notification.setPriority(dto.getPriority());
        return notification;
    }
} 