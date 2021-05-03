package com.demo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.demo.entity.Order;
import com.demo.entity.OrderDetails;

@Repository
public interface OrderRepository extends CrudRepository<Order,Integer>  {

	public Order findByorderid(int orderid);

	public Iterable<Order> findAllBycustomerid(int customerid);

	
	
	

}
