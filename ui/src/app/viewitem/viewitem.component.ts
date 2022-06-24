import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Pitem } from '../model/item.model';
import { AuthService } from '../auth.service';
import { InteractionService } from '../interaction.service';

@Component({
  selector: 'app-viewitem',
  templateUrl: './viewitem.component.html',
  styleUrls: ['./viewitem.component.css']
})
export class ViewitemComponent implements OnInit {
  
  product: Pitem;
  id:string;
  cartLength:string;
  constructor(private productservice:ProductService, private router:Router, private route:ActivatedRoute,private interactionservice:InteractionService) {
    this.product =JSON.parse(localStorage.getItem('item'))

  }
  ngOnInit() {
    this.product=history.state;
    console.log(this.product);

    this.id = localStorage.getItem('userId')
  }
  addToCart(product){
   
    const item = {
      name: product.productName,
      product_id: product._id,
      img: product.imageUrl,
      price: product.price,
      added: true,
      quantity:1
    }
    this.productservice.storeItemToOrder(item);
    this.router.navigateByUrl('/cart');
   
  }
  }
