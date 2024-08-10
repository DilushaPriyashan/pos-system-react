package com.ijse.pr.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ijse.pr.entity.Item;

@Service
public interface ItemService {
    List<Item> getAllItems();
    Item getItemById(Long id);
    Item createItem(Item item);
    Item updateItem(Long id,Item item);
    void deleteItem(Long id);
    List<Item> getItemsByCategoryId(Long categoryId);
    
}
