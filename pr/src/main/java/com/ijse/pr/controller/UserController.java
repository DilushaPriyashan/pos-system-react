package com.ijse.pr.controller;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ijse.pr.entity.User;
import com.ijse.pr.service.UserService;

@CrossOrigin(origins="*")     //users.map is not a function error will come if not use
@RestController
@RequestMapping("/users")    //serves entire controller under /users URi
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService=userService;
    }

    @GetMapping   // default
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }
      
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id){
 
        try{User user = userService.getUserById(id);
        return ResponseEntity.status(HttpStatus.OK).body(user);

        }catch(NoSuchElementException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping
    public ResponseEntity<User> saveUser(@RequestBody User user){
        try{
            User usercreated = userService.saveUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(usercreated);
        }catch(Exception e){ 
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id,@RequestBody User user){
        try{
            User updatedUser = userService.updateUser(id,user);
            return ResponseEntity.status(HttpStatus.OK).body(updatedUser);     // if successfully updated
        }catch(NoSuchElementException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);  //if there is no element to update
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); //if there is a internal error
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id){
        try{
            userService.deleteUser(id);
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
