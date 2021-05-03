package com.demo.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.demo.entity.Customer;
@Repository
public interface CustomerRepository extends CrudRepository<Customer,Integer>  {

	//public Customer findByemail(String email);

	//public Customer findBypassword(String password);

	

	public Customer findBycustomerId(int id);


	public Customer findByemail(String email);

	

	

}
