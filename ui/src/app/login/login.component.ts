import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string;
  errorMessage:boolean=false;
  loginUserData ={};

  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit() {
  }
  loginUser () {
    this.auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token)
        if(res.user.usertype=="Admin"){          
          this.router.navigate(['/admin'])
      }
        else{

          this.router.navigate(['/store'])
        }
      },
      err => console.log(err)
    ) 
  }

}
