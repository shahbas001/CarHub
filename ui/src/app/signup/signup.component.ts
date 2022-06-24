import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { IUser } from '../model/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user =new IUser(null,null,null,null,null)  
  constructor( private auth:AuthService, private router:Router,) { }

  ngOnInit() {

  }
  
  submit() {
  this.auth.register(this.user)
    .subscribe(res => {
        this.router.navigate(['/login'])
      },
      err => console.log(err)
    )}
}
