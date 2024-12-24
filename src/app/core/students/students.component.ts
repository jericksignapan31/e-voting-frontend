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

@Component({
  selector: 'app-students',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
})
export class StudentsComponent {
  users: any[] = [];
  searchQuery: string = '';
  students: IStudentTable[] = [
    {
      username: '2021404303',
      firstName: 'John',
      lastName: 'Dela Cruz',
      mInitial: 'N',
      suffix: 'N/A',
      yearLevel: '7',
      actions: 'Edit',
    },
    {
      username: '2021404304',
      firstName: 'Mark',
      lastName: 'Ruffalo',
      mInitial: 'A',
      suffix: 'Jr',
      yearLevel: '9',
      actions: '',
    },
    {
      username: '2021404305',
      firstName: 'Tony',
      lastName: 'Stank',
      mInitial: 'V',
      suffix: 'II',
      yearLevel: '8',
      actions: '',
    },
  ];

  displayedColumns: string[] = Object.keys(this.students[0]);
  constructor(private authService: UserService) {}

  onSearch(): void {
    console.log('Search query:', this.searchQuery);
    // Add your filtering logic here
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.authService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Failed to load users:', error);
      },
    );
  }
}
