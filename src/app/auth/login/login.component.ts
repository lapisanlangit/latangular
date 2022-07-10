import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Login, User } from './login';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {

  public isiLogin:Login;
  public listUser:User[];
  private loginsub:Subscription;
  public ajax:boolean=false;

  constructor(private loginservice:LoginService,
    private router: Router,private toast:ToastrService) { }



  ngOnInit(): void {

    this.isiLogin={
      email:"",
      password:"",
    }

    this.ajax=false;
  }

  login(){
    if(this.isiLogin.email==''){
      this.toast.error('email harus diisi');
      return;
    }
    if(this.isiLogin.password==''){
      this.toast.error('password harus diisi');
      return;
    }
    this.ajax=true;
    this.loginsub=this.loginservice.login(this.isiLogin).subscribe({
      next: (data) => {
        
        this.listUser=data;
        if(this.listUser[0].token==''){
          this.ajax=false;
          alert('User atau password anda salah');
          this.loginservice.isLoggedIn = false;

          return;
        } else {
          this.loginservice.isLoggedIn = true;

          localStorage.setItem('token', data[0].token);
          this.router.navigate(['/admin/dashboard']);
          this.ajax=false;
        }
      
      },
      error: (error) => {
        console.log(error);
        this.ajax=false;
        return;
      }
    });
  }

  ngOnDestroy(): void {

    if(this.loginsub){
      this.loginsub.unsubscribe()
    }
    
  }
}
