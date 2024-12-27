import { Component, signal } from '@angular/core';
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
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Subscription, catchError, throwError } from 'rxjs';
import { AlertServiceService } from '../../services/alert-service.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  imports: [
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  logo: string = 'assets/login-logo.png';
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _auth: AuthService,
    private _alert: AlertServiceService,
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    sessionStorage.clear();
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  loginSubscription: Subscription = new Subscription();
  isLoadingButton = signal<boolean>(false);
  result: any;

  login() {
    if (this.loginForm.invalid) {
      Swal.fire('Error', 'Please fill in all fields correctly.', 'error');
      return;
    }

    this.isLoadingButton.set(true);
    this._auth.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
      next: () => {
        Swal.fire('Success', 'Login successful!', 'success');
        this.router.navigate(['/layout']);
        this.isLoadingButton.set(false);
      },
      error: (err) => {
        Swal.fire('Error', 'Invalid credentials.', 'error');
        this.isLoadingButton.set(false);
      },
    });
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
