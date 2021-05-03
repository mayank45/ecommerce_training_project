package com.demo.repositories;

import org.springframework.data.repository.CrudRepository;

import com.demo.entities.Category;



public interface CategoryRepository extends CrudRepository<Category,Integer> {

	Category findBycategoryId(String categoryid);

}
