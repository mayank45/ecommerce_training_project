package com.demo.controller;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.demo.entity.Order;
import com.demo.entity.OrderDetails;
import com.demo.service.OrderService;

@RestController
@RequestMapping("orders")
@CrossOrigin(origins = {"http://localhost:4200"}) 
public class OrderController {
	
	@Autowired
	OrderService orderService;
	
	@GetMapping("/show")
	public List<Order> showorder()
	{
		return orderService.displayorder();
	}
	
	@GetMapping("/showorder/{orderid}")
	public Order getOrderByID(@PathVariable int orderid)
	{
		return orderService.findOrderByID(orderid);
	}

	@PostMapping("/save")
	public int placeOrder(@RequestBody Order order)
	{
		return orderService.saveorder(order);
		
		
	}
	@PutMapping("/update/{orderid}")
	public boolean editcustomer(@PathVariable int orderid,@RequestBody Order order)
	{
		return orderService.updateorderstatus(orderid,order);
	}
	@DeleteMapping("/remove/{orderid}")
	public boolean removecustomer(@PathVariable int orderid)
	{
		return orderService.deleteorder(orderid);
	}
	@GetMapping("/search/{customerid}")
	public List<Order> getallordersByCustomer(@PathVariable int customerid)
	{
		return orderService.getorders(customerid);
	}
	@GetMapping("/getDateCustomer/{orderid}")
	public List[] getDateCustomers(@PathVariable int orderid)
	{
		return orderService.findOrdersByID(orderid);
	}
	//orderdetails service
	
	@PostMapping("/orderdetails/save")
	public OrderDetails saveproducts(@RequestBody OrderDetails orderdetails)
	{
		return orderService.saveorderDetails(orderdetails);
	}
	
	@GetMapping("/orderdetails/{orderid}")
	public List<OrderDetails> getallorders(@PathVariable int orderid)
	{
		return orderService.getproducts(orderid);
	}
	
	
	
}
