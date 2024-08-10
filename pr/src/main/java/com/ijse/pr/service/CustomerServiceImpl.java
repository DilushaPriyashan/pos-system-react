package com.ijse.pr.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ijse.pr.entity.Customer;

import com.ijse.pr.repository.CustomerRepository;


@Service
public class CustomerServiceImpl implements CustomerService {

    private CustomerRepository customerRepository;

    @Autowired
    public CustomerServiceImpl(CustomerRepository customerRepository){
        this.customerRepository = customerRepository;
    }

    @Override
    public List<Customer> getAllCustomers(){
        return customerRepository.findAll();
    }

    @Override
    public Customer getCustomerById(Long id){
        return customerRepository.findById(id).orElseThrow(()->new NoSuchElementException("Customer Not Found"));
    }

    @Override
    public Customer createCustomer(Customer customer){
        return customerRepository.save(customer);
    }

    @Override
    public Customer updateCustomer(Long id,Customer customer) {
        Customer existingCustomer = getCustomerById(id);

        existingCustomer.setCustomername(customer.getCustomername());

        return customerRepository.save(existingCustomer);
    }

    @Override
    public void deleteCustomer(Long id){
        customerRepository.deleteById(id);  
    }
}
