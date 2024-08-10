package com.ijse.pr.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ijse.pr.entity.Customer;

@Service
public interface CustomerService {
    List<Customer> getAllCustomers();      
    Customer getCustomerById(Long id); 
    Customer createCustomer(Customer customer);
    Customer updateCustomer(Long id,Customer cutsomer);
    void deleteCustomer(Long id);  
} 