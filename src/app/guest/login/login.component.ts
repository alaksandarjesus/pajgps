import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { GuestService } from '../services/guest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  fb = new FormBuilder;

  loginForm = this.fb.group({
    email: ['testkunde@paj-gps.de', Validators.compose([Validators.required,Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[^@]+@[^@]+\.[^@]+$/)])],
    password: ['App123###...', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20)])],
  })
  submitted:boolean = false;
  constructor(private srv:GuestService, private router:Router){}

  ngOnInit(){
    
  }

  onSubmit(event:any){
    event.preventDefault();
    event.stopPropagation();
    if(this.loginForm.invalid){
      return;
    }
    const payload = this.loginForm.value;
    this.submitted = true;
    this.srv.login(payload).subscribe({
      next: (res:any)=>{
        if(!res?.success?.token){
    this.submitted = false;
          alert("Missing Token");
          return;
        }
        localStorage.setItem('token', res?.success?.token);
        this.router.navigateByUrl('devices')
      },
      error: (err:any)=>{
    this.submitted = false;
        if(err?.error?.error){
          const values = Object.values(err?.error?.error);
          alert(values[0]);
          return;
        }
      }
    })
  }
}
