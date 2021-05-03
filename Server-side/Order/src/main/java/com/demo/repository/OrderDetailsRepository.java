package com.demo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.demo.entity.Order;
import com.demo.entity.OrderDetails;

@Repository
public interface OrderDetailsRepository extends CrudRepository<OrderDetails,Integer> {

	
	Order findByorderid(int orderid);

	Iterable<OrderDetails> findAllByorderid(int orderid);

	
	

}
