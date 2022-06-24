import { Component, OnInit } from '@angular/core';
import { Pitem } from '../model/item.model';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  productItem = new Pitem(null, null, null, null, null, null);
  flagUpdate: Boolean;
  buttonName: String;
  pageTitle: String;
  

  constructor(private productservice:ProductService, private router:Router, private route:ActivatedRoute ) { }

  ngOnInit() {
    this.flagUpdate = false;
    if (this.route.snapshot.params._id) {
      this.productItem = JSON.parse(JSON.stringify(this.route.snapshot.params));
      this.flagUpdate = true;
      this.pageTitle = 'UPDATE PRODUCT'
    }
    else {
      this.flagUpdate = false;
      this.pageTitle = 'ADD PRODUCT'
      }
      console.log(this.submitMethod);
    }
    submitMethod() {
      if (this.flagUpdate == true) {
        this.Update();
      }
      else {
        this.Add();
      }
  
    }
  Add() {
    this.productservice.additem(this.productItem).subscribe(data=>{
         console.log('Message!! '+JSON.parse(JSON.stringify(data)).msg)
          this.router.navigate(['/admin'])
    })
  }
  Update() {
    this.productservice.updateFunction(this.productItem).subscribe((data) => {
      console.log('hai');
      alert(JSON.parse(JSON.stringify(data)).msg);
      this.router.navigate(['/admin']);
    });

  }
}
