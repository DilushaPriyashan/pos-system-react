package com.ijse.pr.entity;

import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="categories")
@Getter
@Setter

public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

 //   @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)    //relationship--> when we look at from the category side it is one to many rela
 //   private List<Item> items;                                   // cascade means do the operations---> to all here
 
}
