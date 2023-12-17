import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../item';
import { ItemService } from '../item.service';
import { OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AddItemComponent } from './add-item/add-item.component';
import { DashboardItem } from './dashboard.item';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DeleteItemComponent } from './delete-item/delete-item.component';
import { MatInputModule } from '@angular/material/input';
import { Subject, debounceTime, distinctUntilChanged, last } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,

    // Component
    AddItemComponent,
    
    // UI
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnChanges{
  private searchTerms = new Subject<string>();
  private curSearchTerms: string = '';
  items?: DashboardItem[];
  shownItems?: DashboardItem[];
  
  constructor(
    private itemService: ItemService, 
    public dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit(): void {
    this.itemsRetrieve();

    this.searchTerms.pipe(
      debounceTime(500),
    ).subscribe(
      (text) => {
        this.curSearchTerms = text;
        this.shownItems = this.itemsFilter(
          this.items, 
          'name',
          text);
      }
    )

    this.searchTerms.next('');
  }

  addItemDialogOpen(): void {
    const dialogRef = this.dialog.open(AddItemComponent, {
      data: {
        name: "", 
        location: "",
        type: ""
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.itemsRetrieve();
    });
  }

  itemDelete(item: DashboardItem): void {
    const dialogRef = this.dialog.open(DeleteItemComponent, {data: item});

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.itemsRetrieve();
    });
  }

  itemSelect(item: DashboardItem): void {
    item.isSelected = !item.isSelected;
  }

  itemsFilter(items: any[] = [], property: string, searchText: string): DashboardItem[] {
    console.log(searchText);
    searchText = searchText.toLowerCase();
    if (!items) return [];
    if (!searchText || searchText == '') return items;
    if (!property || property == '') return items;

    return items.filter((it) => {
        return it[property].toLowerCase().includes(searchText);
    });
  }

  itemsRetrieve(): void {
    this.itemService.getAllItems()
      .subscribe({
        next: (data) => {
          console.log(data)

          this.items = data.map((item: Item) => {
            const di: DashboardItem = {
              isSelected: false,
              ...item
            };

            return di;
          })

          this.searchTerms.next(this.curSearchTerms);
        },
        error: (err) => {
          console.error(err)
        }
      })
  }

  searchTextChanged(searchText: string): void {
    this.searchTerms.next(searchText);
  }
}
