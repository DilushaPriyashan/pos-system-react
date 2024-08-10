package com.ijse.pr.controller;

import java.util.List;
import java.util.NoSuchElementException;

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

import com.ijse.pr.entity.Customer;
import com.ijse.pr.entity.Item;
import com.ijse.pr.service.ItemService;

@CrossOrigin(origins="*")
@RestController   
//@RequestMapping("/items")  //--> have to run in catogery controller too, so remove the request and manual add uri to every operations

public class ItemController {
    private ItemService itemService;

    @Autowired
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping("/items")
    public ResponseEntity<List<Item>> getAllItems() { // can return as anormal list but in here the status also
        List<Item> items = itemService.getAllItems();
        return ResponseEntity.status(HttpStatus.OK).body(items);
    }

    @GetMapping("/items/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable Long id) {
        try {
            Item item = itemService.getItemById(id);
            return ResponseEntity.status(HttpStatus.OK).body(item);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/items")
    public ResponseEntity<Item> saveItem(@RequestBody Item item) {
        try {
            Item newitem = itemService.createItem(item);
            return ResponseEntity.status(HttpStatus.CREATED).body(newitem);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/items/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id,@RequestBody Item item){
        try{
            Item updatedItem = itemService.updateItem(id,item);
            return ResponseEntity.status(HttpStatus.OK).body(updatedItem);     // if successfully updated
        }catch(NoSuchElementException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);  //if there is no element to update
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); //if there is a internal error
        }
    }

    // @PutMapping("/{id}")
    // public ResponseEntity<Item> updateCategory(@PathVariable Long id,@RequestBody Item item){
    //     try{
    //         Item updatedItem = ItemService.updateItem(id,item);
    //         return ResponseEntity.status(HttpStatus.OK).body(updatedItem);     // if successfully updated
    //     }catch(NoSuchElementException e){
    //         return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);  //if there is no element to update
    //     }catch(Exception e){
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); //if there is a internal error
    //     }
    // } 

    @DeleteMapping("/items/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id){
        try{
            itemService.deleteItem(id);
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    //  url/category/:categoryId/items

    @GetMapping("/categories/{categoryId}/items")
    public ResponseEntity<List<Item>> getitembycategoryId(@PathVariable Long categoryId){
        return ResponseEntity.status(HttpStatus.OK).body(itemService.getItemsByCategoryId(categoryId));
    }


}
