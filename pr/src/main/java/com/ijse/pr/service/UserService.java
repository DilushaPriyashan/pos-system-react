package com.ijse.pr.service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import com.ijse.pr.entity.User;

@Service
public interface UserService {
    List<User> getAllUsers();      //have to get list of users
    User getUserById(Long id);   // optional<User> is used to traw the error when there is no user
    User saveUser(User user);
    User updateUser(Long id,User user);
    void deleteUser(Long id);    // because there is a no return type we used void
}
