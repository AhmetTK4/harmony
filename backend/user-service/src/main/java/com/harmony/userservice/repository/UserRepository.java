package com.harmony.userservice.repository;

import com.harmony.userservice.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    
    Optional<User> findByEmail(String email);
    
    boolean existsByEmail(String email);
    
    @Query("{'enabled': true}")
    List<User> findAllEnabledUsers();
    
    @Query("{'roles': ?0}")
    List<User> findByRole(String role);
    
    @Query("{'firstName': {$regex: ?0, $options: 'i'}}")
    List<User> findByFirstNameContainingIgnoreCase(String firstName);
    
    @Query("{'lastName': {$regex: ?0, $options: 'i'}}")
    List<User> findByLastNameContainingIgnoreCase(String lastName);
    
    @Query("{'$or': [{'firstName': {$regex: ?0, $options: 'i'}}, {'lastName': {$regex: ?0, $options: 'i'}}]}")
    List<User> findByFirstNameOrLastNameContainingIgnoreCase(String searchTerm);
} 