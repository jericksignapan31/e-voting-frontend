import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { PositionService } from '../../services/position.service';

@Component({
  selector: 'app-position',
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
  templateUrl: './position.component.html',
  styleUrl: './position.component.css',
})
export class PositionComponent {
  searchQuery: string = '';
  positions: any[] = [];
  displayedColumns: string[] = ['position', 'max_vote', 'actions'];
  dataSource: any[] = [];

  constructor(private positionService: PositionService) {}

  ngOnInit(): void {
    this.loadPositions();
  }

  loadPositions(): void {
    this.positionService.getAllPositions().subscribe({
      next: (positions) => {
        console.log(positions);

        this.positions = positions;
      },
      error: () => {
        Swal.fire(
          'Error',
          'Failed to load positions. Try again later.',
          'error',
        );
      },
    });
  }

  onSearch(): void {
    if (this.searchQuery) {
      this.positions = this.positions.filter((positions) =>
        Object.values(positions)
          .join(' ')
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase()),
      );
    } else {
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
  }

  editPosition(positionId: any): void {
    console.log('Editing position with ID:', positionId); 

    const positionToEdit = this.positions.find(
      (p) => p.position_id === positionId,
    );

    if (positionToEdit) {
      Swal.fire({
        title: 'Edit Position',
        input: 'text',
        inputValue: positionToEdit.position, 
        showCancelButton: true,
        confirmButtonText: 'Update',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed && result.value) {
          positionToEdit.position = result.value;

          this.positionService
            .updatePosition(positionId, { position: result.value })
            .subscribe({
              next: () => {
                Swal.fire(
                  'Success',
                  'Position updated successfully!',
                  'success',
                );
                this.loadPositions(); 
              },
              error: () => {
                Swal.fire(
                  'Error',
                  'Failed to update position. Try again.',
                  'error',
                );
              },
            });
        }
      });
    } else {
      Swal.fire('Error', 'Position not found!', 'error');
    }
  }

  deletePosition(positionId: any): void {
    console.log('Deleting position with ID:', positionId); 

    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete the position with ID "${positionId}". This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.positionService.deletePosition(positionId).subscribe({
          next: () => {
            Swal.fire(
              'Deleted!',
              `Position with ID "${positionId}" has been deleted.`,
              'success',
            );
            this.loadPositions();
          },
          error: () => {
            Swal.fire(
              'Error',
              'Failed to delete position. Please try again later.',
              'error',
            );
          },
        });
      }
    });
  }

  openAddPositionModal() {
    Swal.fire({
      title: 'Add Position',
      html: `
        <input id="position" class="swal2-input" placeholder="Enter position" />
      `,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      preConfirm: async () => {
        const position = (
          document.getElementById('position') as HTMLInputElement
        ).value;
        if (!position) {
          Swal.showValidationMessage('Position is required');
          return null;
        }
        try {
          const existingPositions = await this.positionService
            .getAllPositions()
            .toPromise();
          if (existingPositions && Array.isArray(existingPositions)) {
            const existingPosition = existingPositions.find(
              (pos: any) => pos.position === position,
            );
            if (existingPosition) {
              return {
                id: existingPosition.id,
                position: existingPosition.position,
                max_vote: existingPosition.max_vote + 1,
              };
            } else {
              return {
                position,
                max_vote: 1,
              };
            }
          } else {
            throw new Error('Failed to retrieve positions');
          }
        } catch (error) {
          Swal.showValidationMessage(
            'An error occurred while fetching positions',
          );
          return null;
        }
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const newPosition = result.value;
        if (newPosition.id) {
          this.positionService
            .updatePosition(newPosition.id, { max_vote: newPosition.max_vote })
            .subscribe({
              next: () => {
                Swal.fire(
                  'Success',
                  'Position updated successfully!',
                  'success',
                );
                this.loadPositions();
              },
              error: () => {
                Swal.fire(
                  'Error',
                  'Failed to update position. Try again.',
                  'error',
                );
              },
            });
        } else {
          this.positionService.createUser(newPosition).subscribe({
            next: () => {
              Swal.fire('Success', 'Position added successfully!', 'success');
            },
            error: () => {
              Swal.fire('Error', 'Failed to add position. Try again.', 'error');
            },
          });
        }
      }
    });
  }
}
