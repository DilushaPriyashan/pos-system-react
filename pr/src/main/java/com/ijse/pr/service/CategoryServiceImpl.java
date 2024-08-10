package com.ijse.pr.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ijse.pr.entity.Category;
import com.ijse.pr.repository.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService {
    private CategoryRepository categoryRepository;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository){
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> getAllCategories(){
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(Long id){
        return categoryRepository.findById(id).orElseThrow(()->new NoSuchElementException("Item Not Found"));
    }

    @Override
    public Category createCategory(Category category){
        return categoryRepository.save(category);
    }

  /*  @Override
    public Category updateCategory(Long id,Category category) {
        Category existingCategory = getCategoryById(id);

        existingCategory.setCategoryname(category.getCategoryname());

        return categoryRepository.save(existingCategory);
    }*/ 

    @Override
    public void deleteCategory(Long id){
        categoryRepository.deleteById(id);  // because there is nothing to return do not use return key
    }
}
 