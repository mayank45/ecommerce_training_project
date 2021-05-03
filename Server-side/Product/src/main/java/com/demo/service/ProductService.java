package com.demo.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.entities.Category;
import com.demo.entities.Product;
import com.demo.repositories.CategoryRepository;
import com.demo.repositories.ProductRepository;

@Service
public class ProductService {

	@Autowired
	ProductRepository productRepository;
	
	@Autowired
	CategoryRepository categoryRepository;

	public List<Product> findAllProducts(){
		Iterable<Product> iterable =productRepository.findAll();
		Iterator<Product> iterator=iterable.iterator();
		List<Product> products =new ArrayList<Product>();
		while(iterator.hasNext()) {
			products.add(iterator.next());
		}
		return products;
	}


	public Product findProductbyId(int id) {
		Optional<Product> optional = productRepository.findById(id);
		Product product = optional.orElse(null);
		return product;
	}

	
	public void deleteProduct(int id) {
		productRepository.deleteById(id);
	}

	public Product saveProduct(Product product) {
		return productRepository.save(product);
	}


	public boolean editProduct(int id, Product product) {
		Product dbProduct=findProductbyId(id);
		if(dbProduct != null){
			if(product.getProduct_name() != null){
				dbProduct.setProduct_name(product.getProduct_name());
			}
			if(product.getTotal_quantity() >= 0){
				dbProduct.setTotal_quantity(product.getTotal_quantity());
			}
			if(product. getDescription() != null){
				dbProduct.setDescription(product. getDescription());
			}
			if(product.getCategory() != null){
				dbProduct.setCategory(product.getCategory());
			}
			if(product.getProduct_price() > 0){
			        dbProduct.setProduct_price(product.getProduct_price());
			}
			

			productRepository.save(dbProduct);
		}
		return dbProduct != null;
	}


//category service

public Category saveCategory(Category category)
{
	return categoryRepository.save(category);
}

public Category getCategory(String categoryid)
{
	return categoryRepository.findBycategoryId(categoryid);
}
public List<Category> getAllCategory()
{
	Iterable<Category> iterable =categoryRepository.findAll();
	Iterator<Category> iterator=iterable.iterator();
	List<Category> category =new ArrayList<Category>();
	while(iterator.hasNext()) {
		category.add(iterator.next());
	}
	return category;
}
}