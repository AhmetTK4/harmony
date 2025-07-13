package com.harmony.userservice.service;

import com.harmony.userservice.dto.UserRegistrationDto;
import com.harmony.userservice.dto.UserResponseDto;
import com.harmony.userservice.exception.UserAlreadyExistsException;
import com.harmony.userservice.exception.UserNotFoundException;
import com.harmony.userservice.model.User;
import com.harmony.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public UserResponseDto registerUser(UserRegistrationDto registrationDto) {
        if (userRepository.existsByEmail(registrationDto.getEmail())) {
            throw new UserAlreadyExistsException("User with email " + registrationDto.getEmail() + " already exists");
        }
        
        User user = new User();
        user.setFirstName(registrationDto.getFirstName());
        user.setLastName(registrationDto.getLastName());
        user.setEmail(registrationDto.getEmail());
        user.setPassword(passwordEncoder.encode(registrationDto.getPassword()));
        user.setPhoneNumber(registrationDto.getPhoneNumber());
        user.setAddress(registrationDto.getAddress());
        user.addRole("USER");
        
        User savedUser = userRepository.save(user);
        return convertToResponseDto(savedUser);
    }
    
    public UserResponseDto getUserById(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
        return convertToResponseDto(user);
    }
    
    public UserResponseDto getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));
        return convertToResponseDto(user);
    }
    
    public List<UserResponseDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(this::convertToResponseDto)
                .collect(Collectors.toList());
    }
    
    public List<UserResponseDto> getEnabledUsers() {
        return userRepository.findAllEnabledUsers().stream()
                .map(this::convertToResponseDto)
                .collect(Collectors.toList());
    }
    
    public UserResponseDto updateUser(String id, UserRegistrationDto updateDto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
        
        user.setFirstName(updateDto.getFirstName());
        user.setLastName(updateDto.getLastName());
        user.setPhoneNumber(updateDto.getPhoneNumber());
        user.setAddress(updateDto.getAddress());
        user.setUpdatedAt(LocalDateTime.now());
        
        User updatedUser = userRepository.save(user);
        return convertToResponseDto(updatedUser);
    }
    
    public void deleteUser(String id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }
    
    public void enableUser(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
        user.setEnabled(true);
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);
    }
    
    public void disableUser(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
        user.setEnabled(false);
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);
    }
    
    public List<UserResponseDto> searchUsers(String searchTerm) {
        return userRepository.findByFirstNameOrLastNameContainingIgnoreCase(searchTerm).stream()
                .map(this::convertToResponseDto)
                .collect(Collectors.toList());
    }
    
    public List<UserResponseDto> getUsersByRole(String role) {
        return userRepository.findByRole(role).stream()
                .map(this::convertToResponseDto)
                .collect(Collectors.toList());
    }
    
    private UserResponseDto convertToResponseDto(User user) {
        UserResponseDto dto = new UserResponseDto();
        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setAddress(user.getAddress());
        dto.setRoles(user.getRoles());
        dto.setEnabled(user.isEnabled());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setUpdatedAt(user.getUpdatedAt());
        return dto;
    }
} 