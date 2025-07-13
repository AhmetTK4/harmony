package com.harmony.orderservice.service;

import com.harmony.orderservice.dto.OrderDto;
import com.harmony.orderservice.model.Order;
import com.harmony.orderservice.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;
    
    public List<OrderDto> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public Optional<OrderDto> getOrderById(String id) {
        return orderRepository.findById(id)
                .map(this::convertToDto);
    }
    
    public OrderDto createOrder(OrderDto orderDto) {
        Order order = convertToEntity(orderDto);
        order.setCreatedAt(LocalDateTime.now());
        order.setUpdatedAt(LocalDateTime.now());
        Order savedOrder = orderRepository.save(order);
        return convertToDto(savedOrder);
    }
    
    public Optional<OrderDto> updateOrder(String id, OrderDto orderDto) {
        return orderRepository.findById(id)
                .map(existingOrder -> {
                    existingOrder.setUserId(orderDto.getUserId());
                    existingOrder.setProductId(orderDto.getProductId());
                    existingOrder.setQuantity(orderDto.getQuantity());
                    existingOrder.setTotalAmount(orderDto.getTotalAmount());
                    existingOrder.setStatus(orderDto.getStatus());
                    existingOrder.setShippingAddress(orderDto.getShippingAddress());
                    existingOrder.setNotes(orderDto.getNotes());
                    existingOrder.setUpdatedAt(LocalDateTime.now());
                    return convertToDto(orderRepository.save(existingOrder));
                });
    }
    
    public boolean deleteOrder(String id) {
        if (orderRepository.existsById(id)) {
            orderRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public List<OrderDto> getOrdersByUserId(String userId) {
        return orderRepository.findByUserId(userId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    public List<OrderDto> getOrdersByStatus(String status) {
        return orderRepository.findByStatus(status).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    
    private OrderDto convertToDto(Order order) {
        OrderDto dto = new OrderDto();
        dto.setId(order.getId());
        dto.setUserId(order.getUserId());
        dto.setProductId(order.getProductId());
        dto.setQuantity(order.getQuantity());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setStatus(order.getStatus());
        dto.setShippingAddress(order.getShippingAddress());
        dto.setNotes(order.getNotes());
        return dto;
    }
    
    private Order convertToEntity(OrderDto dto) {
        Order order = new Order();
        order.setUserId(dto.getUserId());
        order.setProductId(dto.getProductId());
        order.setQuantity(dto.getQuantity());
        order.setTotalAmount(dto.getTotalAmount());
        order.setStatus(dto.getStatus());
        order.setShippingAddress(dto.getShippingAddress());
        order.setNotes(dto.getNotes());
        return order;
    }
} 