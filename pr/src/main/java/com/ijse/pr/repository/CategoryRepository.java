package com.ijse.pr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ijse.pr.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository <Category, Long> {
    
}
