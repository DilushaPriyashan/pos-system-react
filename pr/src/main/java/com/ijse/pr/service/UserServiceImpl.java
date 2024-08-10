package com.ijse.pr.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ijse.pr.entity.User;
import com.ijse.pr.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService{
    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long id){
        return userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("User not found "+id));
    }

    @Override
    public User saveUser(User user){
        return userRepository.save(user);
    }

    @Override
    public User updateUser(Long id,User user) {
        User existingUser = getUserById(id);

        existingUser.setUsername(user.getUsername());
        existingUser.setEmail(user.getEmail());
        existingUser.setPassword(user.getPassword());

        return userRepository.save(existingUser);
    }

    @Override
    public void deleteUser(Long id){
        userRepository.deleteById(id);  // because there is nothing to return do not use return key
    }
   
}
