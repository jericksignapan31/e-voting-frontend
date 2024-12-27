import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  profileForm!: FormGroup;
  profilePic: File | null = null;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      first_name: ['', Validators.required],
      mi: ['', Validators.required],
      last_name: ['', Validators.required],
      suffix: [''],
      year_level: ['', Validators.required],
      contact_number: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      sex: ['', Validators.required],
      username: ['', Validators.required],
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.profilePic = file;
      // Handle file upload to storage (e.g., Firebase or your server) here
      this.snackBar.open('Profile picture selected!', 'Close', {
        duration: 2000,
      });
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const profileData = this.profileForm.value;
      // Submit form data to the backend here
      this.snackBar.open('Profile updated successfully!', 'Close', {
        duration: 2000,
      });
    } else {
      this.snackBar.open('Please fill in all required fields.', 'Close', {
        duration: 2000,
      });
    }
  }
}
