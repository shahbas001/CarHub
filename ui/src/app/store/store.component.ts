import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  item: string = "";
  product:{};

  constructor(private productservice:ProductService, private router:Router) { }

  ngOnInit() {
    {
      this.productservice.getitem()
        .subscribe(res => this.product = res,
          err => {
            if( err instanceof HttpErrorResponse ) {
              if (err.status === 401) {
                this.router.navigate(['/admin'])}
              }
            }
    
        )
    }
    }


  update(id){
    this.router.navigateByUrl('/item',{state:id})
  }

}
