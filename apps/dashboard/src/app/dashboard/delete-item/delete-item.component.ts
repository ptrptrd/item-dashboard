import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DashboardItem } from '../dashboard.item';
import { ItemService } from '../../item.service';

@Component({
  selector: 'app-delete-item',
  standalone: true,
  imports: [
    CommonModule,

    // UI
    MatDialogTitle, 
    MatDialogContent, 
    MatDialogActions, 
    MatDialogClose, 
    MatButtonModule,
  ],
  templateUrl: './delete-item.component.html',
  styleUrl: './delete-item.component.scss'
})
export class DeleteItemComponent {
  
  constructor(
    public dialogRef: MatDialogRef<DeleteItemComponent>,
    private itemService: ItemService, 
    @Inject(MAT_DIALOG_DATA) public data: DashboardItem) {}

  itemDeleteCancel(): void {
    this.dialogRef.close();
  }

  itemDeleteConfirm(): void {
    if (this.data.id) {
      this.itemService.deleteItem(this.data.id)
        .subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (err) => {
            console.log(err);
          }
        })
    }
  }
}
