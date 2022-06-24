import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

 
  items :any;
  quantity:number=1;
  subtotal:number;
  totalitems:number;
  total:number;
  price:number;
  constructor(private productservice:ProductService, private router:Router,
    
    ) { }

  ngOnInit() {
    this.items =this.productservice.getOrderFromItems();
    if(this.items==null){
     
      this.subtotal=0;
      this.total=0;
      this.totalitems=0;
    }
    else{
    this.price=this.items.price;
    this.totalitems=this.items.length;
     this.subtotal= this.items.length * 350;
     this.total=this.subtotal + 6.94;
    }


    
}

removeProduct(i){
  if (i > -1) {
    this.items.splice(i, 1);
  }
  this.totalitems = this.items.length;
  this.subtotal = this.totalitems * 350;
  this.total = this.subtotal + 6.94;
  this.productservice.updateItemsInOrder(this.items);
  this.router.navigate(['/cart']);
}
}
