package com.ijse.pr.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ijse.pr.entity.Item;
import com.ijse.pr.repository.ItemRepository;


@Service
public class ItemServiceImpl implements ItemService{
    private ItemRepository itemRepository;

    @Autowired
    public ItemServiceImpl(ItemRepository itemRepository){
        this.itemRepository = itemRepository;
    }

     @Override
    public List<Item> getAllItems(){
        return itemRepository.findAll();
    }

    @Override
    public Item getItemById(Long id){
        return itemRepository.findById(id).orElseThrow(()->new NoSuchElementException("Item Not Found"));
    }

    @Override
    public Item createItem(Item item){
        return itemRepository.save(item);
    }

    @Override
    public Item updateItem(Long id,Item item) {
        Item existingItem = getItemById(id);

        existingItem.setName(item.getName());
        existingItem.setPrice(item.getPrice());
        existingItem.setQty(item.getQty());

        return itemRepository.save(existingItem);
    }

    @Override
    public void deleteItem(Long id){
        itemRepository.deleteById(id);  // because there is nothing to return do not use return key
    }

    @Override
    public List<Item> getItemsByCategoryId(Long categoryId){
        return itemRepository.findItemsByCategoryId(categoryId);
    }
    
}

