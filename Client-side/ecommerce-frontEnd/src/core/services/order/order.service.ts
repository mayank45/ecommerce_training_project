import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private host:String="http://localhost:9999";

  constructor(private http:HttpClient) { }


  updateOrder(orderId,order){
    return this.http.put(`${this.host}/orders/update/${orderId}`, order);
  }

  getOrderByOrderId(orderId){
    return this.http.get(`${this.host}/orders/showorder/${orderId}`);
  }
  getAllOrdersByCustomerId(cid){
    return this.http.get(`${this.host}/orders/search/${cid}`);
  }
  getAllOrders(){
    return this.http.get(`${this.host}/orders/show`);
  }

  createOrder(order){
    return this.http.post(`${this.host}/orders/save`, order);
  }

  createOrderDetails(orderDetails){
    return this.http.post(`${this.host}/orders/orderdetails/save`, orderDetails);
  }

  getAllOrderDetailsByCustomerId(orderId){
    return this.http.get(`${this.host}/orders/orderdetails/${orderId}`);
  }
}
