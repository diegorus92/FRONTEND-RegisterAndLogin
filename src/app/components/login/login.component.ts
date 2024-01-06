import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import  {AuthService}  from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  loginForm = this.formBuilder.group({
    email:['', [Validators.email, Validators.required]],
    password:['', [Validators.required]]
  })


  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router:Router){}

  onInit() {}



  login(){
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value.email!, this.loginForm.value.password!).
      subscribe({
        next: response=>{
          console.log("User logged!"); 
          this.router.navigate(['home']);
        },
        complete: ()=>{ console.log("Login completed")},
        error: ()=>{ 
          console.log("Error during login");
        }
      });
      return;
    }
    console.log("Form data is invalid");
  }
}
