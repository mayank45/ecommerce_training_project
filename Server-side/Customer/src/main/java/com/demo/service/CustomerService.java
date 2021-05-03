package com.demo.service;



import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.demo.entity.Customer;
import com.demo.repository.CustomerRepository;

@Service
public class CustomerService {
	@Autowired
	CustomerRepository customerRepository;
	
	public boolean savecustomer(Customer customer)
	{
		
		
		 customerRepository.save(customer);
		 return true;
	}
	
	public boolean  verifycustomer( Customer customer)
	
	{
	    Customer obj1=customerRepository.findByemail(customer.getEmail());
	    if(obj1!=null)
	    {
	    	boolean a=obj1.getPassword().equals(customer.getPassword());
	    	if(a==true)
	    	{
	    		return true;
	    	}
	    }
	   return false;
	    
		
	
	}
	public boolean updatecustomer(String email,Customer customer)
	{
		Customer obj3=customerRepository.findByemail(email);
		
		if(obj3!=null)
		{
		if(customer.getCustomer_name()!=null)
			obj3.setCustomer_name(customer.getCustomer_name());
		if(customer.getEmail()!=null)
			 obj3.setEmail(customer.getEmail());
		if(customer.getPassword()!=null)
			obj3.setPassword(customer.getPassword());
		if(customer.getAddress()!=null)
			obj3.setAddress(customer.getAddress());
		if(customer.getPhno()!=0)
			obj3.setPhno(customer.getPhno());
		if(customer.getDeliveryAddress()!=null)
			obj3.setDeliveryAddress(customer.getDeliveryAddress());
		customerRepository.save(obj3);
		return obj3!=null;
		}
	
	return false;
	}
	public List<Customer> displaycustomer()
	{
	  Iterable<Customer> customer=customerRepository.findAll();
	  Iterator<Customer> iterator=customer.iterator();
	  List<Customer> customerlist=new ArrayList<Customer>();
		while(iterator.hasNext()) {
			customerlist.add(iterator.next());
		}
		return customerlist;
	}
	public Customer getCustomerEmail(String email)
	{
		Customer cust= customerRepository.findByemail(email);
		 return cust;
	}
	public boolean deletecustomer(int id)
	{
		Customer customer= customerRepository.findBycustomerId(id);
		if(customer!=null)
		{
			customerRepository.delete(customer);
			return true;
		} 
		return false;
	}
	public boolean updatePassword(String email)
	{
		//Customer cust=new Customer();
		Customer obj4=customerRepository.findByemail(email);
		
		if(obj4!=null)
		{
		String chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghi"
		          +"jklmnopqrstuvwxyz!@#$%&";
				Random rnd = new Random();
				int length=10;
				StringBuilder sb = new StringBuilder();
				for (int i = 0; i < length; i++)
					sb.append(chars.charAt(rnd.nextInt(chars.length())));
				//String pass= sb.toString();
				obj4.setPassword(sb.toString());
				customerRepository.save(obj4);
				return true;
		}
		return false;
		
	}

}
		
	



 
