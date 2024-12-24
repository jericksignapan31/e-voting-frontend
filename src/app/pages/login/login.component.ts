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
  imports: [MatIconModule, ReactiveFormsModule, CommonModule,HttpClientModule,MatProgressSpinnerModule],
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
    private _alert: AlertServiceService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
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
    this.isLoadingButton.set(true);

    this.loginSubscription.add(
      this._auth
        .login(this.loginForm.value.username, this.loginForm.value.password)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              this._alert.alertWithTimer(
                'error',
                'Invalid Credentials',
                'Invalid Credentials'
              );
              this.isLoadingButton.set(false);
            } 
            return throwError(error);
          })
        )

        .subscribe((response) => {
         
          if(this._auth.userInfo?.archived === true){
    this._alert.handleError('Inactive Account Please Report to Admin')
    this.loginForm.reset()
     this.isLoadingButton.set(false);

    return
  } 
  
  else {
      this._alert.alertWithTimer(
              'success',
              'Success',
              'Login Successful'
            );
            setTimeout(() => {
              this.router.navigate(['\layout']);
            this.isLoadingButton.set(false);
            }, 2000);
          }
  }
         )
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
