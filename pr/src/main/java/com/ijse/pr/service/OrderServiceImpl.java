package com.ijse.pr.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ijse.pr.entity.Order;
import com.ijse.pr.repository.OrderRepository;

@Service
public class OrderServiceImpl implements OrderService {

    private OrderRepository orderRepository;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository){
        this.orderRepository=orderRepository;
    }

    @Override
    public List<Order> getAllOrders(){
        return orderRepository.findAll();
    }

    @Override
    public Order getOrderById(Long id){
        return orderRepository.findById(id).orElseThrow(()->new NoSuchElementException("Order Not Found"));
    }

    @Override
    public Order createOrder(Order order){
        return orderRepository.save(order);
    }
    
}
