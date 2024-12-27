import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../../../services/user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-students',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.css'], // Fixed "styleUrl" to "styleUrls"
})
export class AddStudentsComponent implements OnInit {
  studentForm!: FormGroup;
  isSubmitting = false; // To handle submission state

  constructor(
    private fb: FormBuilder,
    private studentsService: UserService,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.studentForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      password: [''],
      middle_initial: [''],
      suffix: [''],
      year_level: [null, [Validators.required]],
      contact_number: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10,11}$')],
      ],
      email: ['', [Validators.email]],
      username: ['', [Validators.required]],
      status: ['male', [Validators.required]],
      user_role_id: [null], // Default value as null
    });
  }

  onSubmit(): void {
    if (this.studentForm.invalid) {
      console.error('Form is invalid', this.studentForm.errors);
      return;
    }

    this.isSubmitting = true; // Disable the button during submission
    this.studentForm.get('user_role_id')?.setValue('1'); // Set default role

    this.studentsService.createUser(this.studentForm.value).subscribe({
      next: (response) => {
        console.log('Student added successfully:', response);
        this.studentForm.reset();
        this.studentForm.get('status')?.setValue('male'); // Reset status to default
      },
      error: (error) => {
        console.error('Error adding student:', error);
      },
      complete: () => {
        this.isSubmitting = false; // Re-enable the button
      },
    });
  }
}
