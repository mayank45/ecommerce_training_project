import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private data:any[] = [];

  public set admins(admins){
    this.data = admins;
  }

  public get admins(){
    return this.data;
  }

  private host:string = "http://localhost:5959";
  constructor(private http: HttpClient) {}

  getAdmins(){
    return this.http.get(`${this.host}/admins/show`);
  }
  // saveCustomer(customer){
  //   return this.http.post(`${this.host}/customers/register`, customer);
  // }
  // displayCustomerByEmail(Email){
  //   return  this.http.get(`${this.host}/customers/bymail/${Email}`);
  // }
  // updateCustomer(email,customer){
  //   return this.http.post(`${this.host}/customers/update/{email}`, customer);
  // }

 // deleteCustomer(id){
 //   return this.http.delete(`${this.host}/customer/${id}`);
 // }

  // findCustomerById(id){
  //   return this.http.get(`${this.host}/customers/${id}`);
  // }

  // editCustomer(email, newCustomer){
  //   return this.http.put(`${this.host}/customers/${email}`, newCustomer);
  // }
  login(admin){
    return this.http.post(`${this.host}/admin/login`,admin);
  }

  // getCustomerDetails(email){
  //   return this.http.get(`${this.host}/customers/bymail/${email}`);
  // }

}
