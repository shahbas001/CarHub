import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Pitem } from '../model/item.model';

@Component({
  selector: 'app-adhome',
  templateUrl: './adhome.component.html',
  styleUrls: ['./adhome.component.css']
})
export class AdhomeComponent implements OnInit {
  products;
  constructor(private productService: ProductService,
    private _router: Router) { }

  ngOnInit() {
    this.productService.getProducts()
      .subscribe((data) => {
        this.products = JSON.parse(JSON.stringify(data));
    })
  }
  

  delete(id) {
    console.log(id)
    this.productService.delProduct(id)
      .subscribe((data) => {
        alert(JSON.parse(JSON.stringify(data)).msg);
        this.ngOnInit();
      })
  }

  update(id) {
    this.productService.updtProduct(id)
  }

  }

