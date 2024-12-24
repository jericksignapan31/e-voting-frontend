import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { MatIconModule } from '@angular/material/icon';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [MatIconModule, ReactiveFormsModule, CommonModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  logo: string = 'assets/login-logo.png';
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _Auth: AuthService 
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
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
      Swal.fire({
        title: 'Form Error',
        text: 'Please fill in all required fields correctly.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    // Call the LoginService to authenticate the user
    const { username, password } = this.loginForm.value;
    this._Auth.login(username, password).subscribe(
      (response) => {
        // Handle successful login response
        Swal.fire('Logged In', 'Welcome back!', 'success');
        this.router.navigate(['/layout']); // Redirect to dashboard or layout
      },
      (error) => {
        // Handle error
        Swal.fire('Login Failed', 'Invalid username or password.', 'error');
      }
    );
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
      },
    });
  }
}
