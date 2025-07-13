package com.harmony.productservice.repository;

import com.harmony.productservice.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {
    
    List<Product> findByCategory(String category);
    
    List<Product> findByNameContainingIgnoreCase(String name);
    
    @Query("{'price': {$gte: ?0, $lte: ?1}}")
    List<Product> findByPriceRange(Double minPrice, Double maxPrice);
    
    List<Product> findByStockQuantityGreaterThan(Integer quantity);
    
    Optional<Product> findByName(String name);
    
    boolean existsByName(String name);
} 