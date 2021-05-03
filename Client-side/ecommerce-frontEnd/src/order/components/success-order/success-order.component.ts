import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';
import { MessengerService } from 'src/core/services/messenger/messenger.service';
import { OrderService } from 'src/core/services/order/order.service';

@Component({
  selector: 'app-success-order',
  templateUrl: './success-order.component.html',
  styleUrls: ['./success-order.component.css']
})
export class SuccessOrderComponent implements OnInit {

  orderId:string;
  constructor(private orderService:OrderService,private _Activatedroute:ActivatedRoute,private session:SessionStorageService,private msg:MessengerService) { 
  
  }
  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => { 
      this.orderId = params.get('id'); 
  });
  this.session.set("cartItems","");
    this.msg.clearMessages();
  }

  routeToHome(){
    //window.location.reload();
    this.session.set("cartItems","");
    //this.router.navigate(['/../home'])
    
    
   
  }
  
}
