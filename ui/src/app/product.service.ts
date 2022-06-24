import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private addUrl="http://localhost:3000/api/add";
  private getitems="http://localhost:3000/api/store";
  private deleteitem="http://localhost:3000/api/delete";
  private update="http://localhost:3000/api/getproduct";
  private updateproduct="http://localhost:3000/api/updateproduct";
  private search="http://localhost:3000/api/find";
  private addtocart="http://localhost:3000/api/addtocart";
  private getcartURL="http://localhost:3000/api/getcart";

  constructor(private http:HttpClient, private router:Router) { }
  product;
  product1;
  product2;
  iteml: any;
  additem(item){
    return this.http.post<any>(this.addUrl, item)
  }
  getitem(){
    return this.http.get<any>(this.getitems);
  }
  getProducts(){
    return this.http.get(this.getitems);
  }
  getsearch(item) {
   return this.http.post(this.search, item)
  }
  delProduct(id){
    return this.http.post(this.deleteitem,{'_id':id});
  }
  updtProduct(id){
    this.http.post(this.update,{'_id':id})
    .subscribe((data)=>{
      this.product=JSON.parse(JSON.stringify(data));
      this.router.navigate(['/add',this.product])
    })
  }
  updateFunction(item){
    return this.http.post(this.updateproduct,{'product':item})
  }
  viewItem(item:any){
    localStorage.setItem('item',JSON.stringify(item))
    this.router.navigate(['/item'])
  }
  
  storeItemToOrder(item: any) {
    var tempItem = JSON.parse(localStorage.getItem("items"));
    if (tempItem == null) tempItem = [];
    localStorage.setItem("item", JSON.stringify(item));
    tempItem.push(item);
    localStorage.setItem("items", JSON.stringify(tempItem));
  }
  getOrderFromItems() {
    return this.iteml = JSON.parse(localStorage.getItem("items"));
  }
  updateItemsInOrder(items: any) {
    localStorage.removeItem("items");
    localStorage.setItem("items", JSON.stringify(items));
  }
}
