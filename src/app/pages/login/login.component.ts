import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [MatIconModule, ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  logo: string = 'assets/login-logo.png'
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

   onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    console.log('Form Submitted', this.loginForm.value);

    Swal.fire('Logged In', 'Welcome back!', 'success');
  }



  onForgotPassword(): void {
    Swal.fire({
      title: 'Enter your email',
      input: 'email',
      inputPlaceholder: 'Your email address',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      inputValidator: (value) => {
        if (!value) {
          return 'Please enter an email address!';
        }
        console.log('Reset email sent to:', value);
        return null;
      }
    });
  }
}
