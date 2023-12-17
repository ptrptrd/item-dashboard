import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Item } from '../../item';
import { ItemService } from '../../item.service';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [
    CommonModule,

    // UI 
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss'
})
export class AddItemComponent {
  constructor(
    public dialogRef: MatDialogRef<AddItemComponent>,
    private itemService: ItemService,
    @Inject(MAT_DIALOG_DATA) public data: Item,
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    this.itemService.createItem(this.data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.dialogRef.close();

        },
        error: (err) => {
          console.log(err);
        }
      }) 
  }
}
