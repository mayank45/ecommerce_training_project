package com.demo.repositories;
import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.demo.entities.ImageModel;
import com.demo.entities.Product;

public interface ProductRepository extends CrudRepository<Product,Integer> {

	void save(ImageModel img);
	//List<Product> findByName(String name);

	

}