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
import { RouterModule } from '@angular/router';

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
  

  constructor(private authService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.authService.getUsers().subscribe(
      (data: any[]) => {
        // Map API data to match IStudentTable interface
        this.students = data.map((user) => ({
          username: user.username,
          firstName: user.first_name,
          lastName: user.last_name,
          mInitial: user.middle_initial || '',
          suffix: user.suffix || 'N/A',
          yearLevel: user.year_level || 'N/A',
          actions: '', // Initialize the 'actions' field if needed
        }));
      },
      (error) => {
        console.error('Failed to load users:', error);
      }
    );
  }

  onSearch(): void {
    // Filter students based on search query
    if (this.searchQuery) {
      this.students = this.students.filter((student) =>
        Object.values(student)
          .join(' ')
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.loadUsers(); // Reset to original data if query is empty
    }
  }

  editStudent(student: IStudentTable): void {
    console.log('Edit student:', student);
    // Implement edit logic here
  }

  deleteStudent(student: IStudentTable): void {
    console.log('Delete student:', student);
    // Implement delete logic here
  }
}
