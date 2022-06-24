import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { StoreComponent } from './store/store.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AdhomeComponent } from './adhome/adhome.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { ViewitemComponent } from './viewitem/viewitem.component';


const routes: Routes = [
  
  {
    path: '',
    component: HomeComponent
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'signup',
    component : SignupComponent
  },
  {
    path : 'store',
    component : StoreComponent
  },
  {
    path : 'item',
    component : ViewitemComponent
  },
  {
    path: 'upload',
    component: PrescriptionComponent
  },
  
  {
    path : 'cart',
    component : CartComponent
  },
  {
    path : 'checkout',
    component : CheckoutComponent
  },
  { 
    path : 'admin',
    component : AdhomeComponent
  },
  {
    path : 'add',
    component : AddproductComponent
  },
  



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
