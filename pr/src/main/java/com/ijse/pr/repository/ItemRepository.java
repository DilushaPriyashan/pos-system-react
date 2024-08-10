package com.ijse.pr.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ijse.pr.entity.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item,Long> {
    // custom queries
                                                                    //i=item here
    @Query("SELECT i FROM Item i WHERE i.category.id=:categoryId")   // SELECT * FROM items WHERE category_id = :categoryId   (using mySql)
    List<Item> findItemsByCategoryId(@Param("categoryId") Long categoryId);    // new custom query
}
