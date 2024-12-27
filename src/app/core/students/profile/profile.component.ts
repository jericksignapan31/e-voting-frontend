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
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { SharedService } from '../../../services/shared.service';

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
  student: any;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private userService: UserService,
    private sharedService: SharedService,
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

    this.student = this.sharedService.getStudent();
    console.log(this.student, 'student');
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.profilePic = file;
      this.snackBar.open('Profile picture selected!', 'Close', {
        duration: 2000,
      });
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const profileData = this.profileForm.value;
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
