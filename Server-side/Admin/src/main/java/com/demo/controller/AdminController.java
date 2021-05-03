package com.demo.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.demo.entities.Admin;
import com.demo.entities.Customer;
import com.demo.entities.Product;
import com.demo.service.AdminService;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixProperty;

@RestController
@RequestMapping("/admin")
@EnableCircuitBreaker
@CrossOrigin(origins = {"http://localhost:4200"}) 
public class AdminController {

	@Autowired
	AdminService adminService;
	@Autowired
	RestTemplate restTemplate;

	@PostMapping("/login")
	public boolean loginadmin(@RequestBody Admin admin) {
		return adminService.verifyadmin(admin);
	}

//view all products
//	localhost:5959/admin/products
	@GetMapping("/products")
	@HystrixCommand(fallbackMethod = "findProductsFallback", commandProperties = {
			@HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "5000"),
			@HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "4"),
			@HystrixProperty(name = "circuitBreaker.errorThresholdPercentage", value = "50"),
			@HystrixProperty(name = "circuitBreaker.sleepWindowInMilliseconds", value = "5000") })

	public List<Product> findProducts() {

		ResponseEntity<List<Product>> response = restTemplate.exchange("http://PRODUCT-SERVICE/products",
				HttpMethod.GET, null, new ParameterizedTypeReference<List<Product>>() {
				});

		List<Product> products = response.getBody();

		return products;

	}

	public List<Product> findProductsFallback() {
		Product product = new Product();

		List<Product> products = new ArrayList<Product>();
		products.add(product);
		return products;
	}

//view all customers
//	localhost:5959/admin/customers
	@GetMapping("/customers")
	@HystrixCommand(fallbackMethod = "findUsersFallback", commandProperties = {
			@HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "5000"),
			@HystrixProperty(name = "circuitBreaker.requestVolumeThreshold", value = "4"),
			@HystrixProperty(name = "circuitBreaker.errorThresholdPercentage", value = "50"),
			@HystrixProperty(name = "circuitBreaker.sleepWindowInMilliseconds", value = "5000") })

	public List<Customer> findUsers() {

		ResponseEntity<List<Customer>> response = restTemplate.exchange("http://CUSTOMER-SERVICE/customers/show",
				HttpMethod.GET, null, new ParameterizedTypeReference<List<Customer>>() {
				});

		List<Customer> users = response.getBody();

		return users;

	}

	public List<Customer> findUsersFallback() {
		Customer user = new Customer();

		List<Customer> users = new ArrayList<Customer>();
		users.add(user);
		return users;
	}

//	    http://localhost:5959/admin/products/id  -->get products by id
	@GetMapping("/products/{id}")
	public Product findProductById(@PathVariable int id) {

		Product result = restTemplate.getForObject("http://PRODUCT-SERVICE/products/{id}", Product.class, id);

		System.out.println(result);
		return result;
	}

//http://localhost:5959/admin/products/{id} --> deleting product by id	
	@DeleteMapping("/products/{id}")
	public boolean deleteProductById(@PathVariable int id) {

		Product product = findProductById(id);
		restTemplate.delete("http://PRODUCT-SERVICE/products/{id}", id);
		if (product != null) {
			return true;
		} else {
			return false;
		}

	}

//http://localhost:5959/admin/remove-customer/{id} --> deleting customer by id	
	@DeleteMapping("/remove-customer/{id}")
	public boolean deleteUserById(@PathVariable int id) {

		Customer user = findCustomerById(id);
		restTemplate.delete("http://CUSTOMER-SERVICE/customers/remove/{id}", id);
		if (user != null) {
			return true;
		} else {
			return false;
		}

	}

//// http://localhost:5959/admin/products -->add a new product
//	@PostMapping("/products")
//	public Product saveProduct(@RequestBody Product product) {
//
//		Product result = restTemplate.postForObject("http://PRODUCT-SERVICE/products", product, Product.class);
//		System.out.println(result);
//		return result;
//
//	}

//	http://localhost:5959/admin/customers/id  -->get users by id
		@GetMapping("/customers/{id}")
	    public Customer findCustomerById(@PathVariable int id){
			
			 Customer result = restTemplate.getForObject("http://CUSTOMER-SERVICE/customers/{id}", Customer.class, id);

		        System.out.println(result);
			return result;
		}

}
