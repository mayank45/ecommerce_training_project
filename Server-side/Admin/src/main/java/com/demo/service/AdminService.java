package com.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.entities.Admin;
import com.demo.repositories.CustomerRepository;
import com.demo.repositories.ProductRepository;

@Service
public class AdminService {

	@Autowired
	ProductRepository productRepository;
	@Autowired
	CustomerRepository customerRepository;

	public boolean verifyadmin(Admin admin)
	{
		boolean b=admin.getEmail().equals("admin@gmail.com");
		boolean a=admin.getPassword().equals("admin");
		if(a==true && b==true)
			return true;
		return false;
	}

}
