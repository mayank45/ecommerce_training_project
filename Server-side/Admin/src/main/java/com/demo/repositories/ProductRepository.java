package com.demo.repositories;
import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.demo.entities.Product;

@Repository
public interface ProductRepository extends CrudRepository<Product,Integer> {
	//List<Product> findByName(String name);

}