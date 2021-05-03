package com.demo.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.entity.Customer;
import com.demo.service.CustomerService;

@RestController
@RequestMapping("customers")
@CrossOrigin(origins = {"http://localhost:4200"}) 
public class CustomerController {
	@Autowired
	CustomerService customerService;

	//localhost:9595/customers/register
	@PostMapping("/register")
	public boolean registercustomer(@RequestBody Customer customer) {

		return customerService.savecustomer(customer);

	}

	//localhost:9595/customers/login
	@PostMapping("/login")
	public boolean logincustomer(@RequestBody Customer customer) {
		return customerService.verifycustomer(customer);
	}

	//localhost:9595/customers/show
	@GetMapping("/show")
	public List<Customer> showcustomer() {
		return customerService.displaycustomer();
	}

	//localhost:9595/customers/update
	@PutMapping("/update/{email}")
	public boolean editcustomer(@PathVariable String email, @RequestBody Customer customer) {
		return customerService.updatecustomer(email, customer);
	}
	//localhost:9595/customers/bymail
	@GetMapping("/bymail/{email}")
	public Customer displayCustomerByEmail(@PathVariable String email)
	{
		return customerService.getCustomerEmail(email);
	}	//localhost:9595/customers/remove
	@DeleteMapping("/remove/{id}")
	public boolean removecustomer(@PathVariable int id) {
		return customerService.deletecustomer(id);
	}
	@GetMapping("/forgot/{email}")
	public boolean forgotPassword(@PathVariable String email)
	{
		return customerService.updatePassword(email);
	}
}