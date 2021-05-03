import { Injectable } from '@angular/core';
import {Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  subject=new Subject();

  constructor() { }

  sendMsg(product){
    
    this.subject.next(product);
    //console.log("get msg"+product);
  }

  clearMessages() {
    this.subject.next();
}

  getMsg(){
    return this.subject.asObservable();
  }

  /*
 setCart(item){
   console.log(null);
    this.subject.next(item);
  }

  getCartstatus(){
    console.log(this.subject.asObservable());
    return this.subject.asObservable();
  }
  */
}
