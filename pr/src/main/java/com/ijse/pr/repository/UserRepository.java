package com.ijse.pr.repository;    // repository is a interface

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ijse.pr.entity.User;

@Repository  // Jparepository eke anthi custom ewa witharak methana liyanawa
public interface UserRepository extends JpaRepository<User,Long>{
    User findByEmail(String email);
}

