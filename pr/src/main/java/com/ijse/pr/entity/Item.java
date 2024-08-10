package com.ijse.pr.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="items")
@Getter
@Setter
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private Integer qty;

    @ManyToOne(fetch = FetchType.EAGER)     // fetch --->LAZY means if requested then load 
    @JoinColumn(name="category_id")     //forign key of category
    private Category category;         // relationship  build in both sides can be lead to error
    
    @ManyToMany(mappedBy = "items")
    private Set<Order> orders=new HashSet<>();

    // public void setItemName(String itemname) {
    //     // TODO Auto-generated method stub
    //     throw new UnsupportedOperationException("Unimplemented method 'setItemName'");
    // }

}
