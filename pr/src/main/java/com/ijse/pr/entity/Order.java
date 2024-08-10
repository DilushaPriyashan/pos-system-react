package com.ijse.pr.entity;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data   // Getter and Setter
@Table(name="orders")
public class Order { 

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(updatable = false)       //cannot update
    private LocalDateTime createdAt;


    @Column(nullable = false)
    private Integer total;


    @ManyToOne(fetch = FetchType.EAGER)    // order and user relationship
    @JoinColumn(name="customer_id")         //forign key of user entity
    private Customer customer;


    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(                    //because of many to many relationship we have to create intermeadiate table
        name="order_items",
        joinColumns={@JoinColumn(name="order_id")},
        inverseJoinColumns={@JoinColumn(name="item_id")}
    )
    private Set<Item> items =new HashSet<>();    // in set only shows unique valus, duplicate valus didnt show
     

    //get the time and date that create the order and update it
    @PrePersist     //before value go to database excute
    protected void onCreate(){
        this.createdAt = LocalDateTime.now();
   
    }
    
}
