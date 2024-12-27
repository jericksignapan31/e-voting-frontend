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
import Swal from 'sweetalert2';

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
  styleUrls: ['./add-students.component.css'],
})
export class AddStudentsComponent implements OnInit {
  studentForm!: FormGroup;
  isSubmitting = false;

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
      user_role_id: [null],
    });
  }

  onSubmit(): void {
    if (this.studentForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Form',
        text: 'Please fill in all required fields correctly.',
      });
      console.error('Form is invalid', this.studentForm.errors);
      return;
    }

    this.isSubmitting = true;
    this.studentForm.get('user_role_id')?.setValue(1);

    this.studentsService.createUser(this.studentForm.value).subscribe({
      next: (response) => {
        console.log('Student added successfully:', response);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Student has been added successfully!',
        });
        this.studentForm.reset();
        this.studentForm.get('status')?.setValue('male');
      },
      error: (error) => {
        console.error('Error adding student:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error adding the student. Please try again.',
        });
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }
}
