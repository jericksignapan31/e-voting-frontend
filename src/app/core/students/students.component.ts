import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IStudentTable } from '../../interface';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-students',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
})
export class StudentsComponent {
  searchQuery: string = '';
  students: IStudentTable[] = [];
  displayedColumns: string[] = [
    'username',
    'firstName',
    'lastName',
    'mInitial',
    'suffix',
    'yearLevel',
  ];

  constructor(
    private authService: UserService,
    private router: Router,
    private sharedService: SharedService,
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.authService.getUsers().subscribe(
      (data: any[]) => {
        this.students = data.map((user) => ({
          user_id: user.user_id,
          username: user.username,
          firstName: user.first_name,
          lastName: user.last_name,
          mInitial: user.middle_initial || '',
          email: user.email,
          contact_number: user.contact_number,
          suffix: user.suffix || 'N/A',
          yearLevel: user.year_level || 'N/A',
          qr_code: user.qr_code,
          actions: '',
        }));
      },
      (error) => {
        console.error('Failed to load users:', error);
      },
    );
  }

  onSearch(): void {
    if (this.searchQuery) {
      this.students = this.students.filter((student) =>
        Object.values(student)
          .join(' ')
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase()),
      );
    } else {
      this.loadUsers();
    }
  }

  editStudent(student: IStudentTable): void {
    this.sharedService.setStudent(student);
    this.router.navigate(['/layout/profile']);
  }

  deleteStudent(student: IStudentTable): void {
    this.sharedService.setStudent(student);
    console.log(student, 'delete');

    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to archived ${student.firstName} ${student.lastName}. This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.deleteUser(student.user_id).subscribe({
          next: (response) => {
            Swal.fire(
              'Deleted!',
              `${student.firstName} ${student.lastName} has been archived.`,
              'success'
            );

            this.students = this.students.filter(s => s.user_id !== student.user_id);
          },
          error: (err) => {
            console.error('Error archived student:', err);
            Swal.fire(
              'Error!',
              'Failed to delete the student. Please try again later.',
              'error'
            );
          },
        });
      }
    });
  }
}
