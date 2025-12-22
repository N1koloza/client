import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../core/services/shop.service';
import { Product } from '../../shared/models/products';
import { ProductItemComponent } from './product-item/product-item.component';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatAnchor } from "@angular/material/button";
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { FiltersDialogComponent } from './filters-dialog/filters-dialog.component';
import { MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'app-shop',
  imports: [ProductItemComponent,
    MatAnchor,
    MatIcon,
    MatButton,
    MatMenu,
    MatSelectionList,
    MatListOption,
    MatMenuTrigger
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {

  products: Product[] = [];
  private shopSrv = inject(ShopService);
  private dialogSrv = inject(MatDialog);
  selectedBrands: string[] = [];
  selectedTypes: string[] = [];
  selectedSort: string = 'name';
  sortOptions = [
    {
      name: 'Alphabetical', value: 'name'
    },
    {
      name: 'Price: Low-High', value: 'priceAsc'
    },
    {
      name: 'Price: High-Low', value: 'priceDesc'
    }

  ];

  constructor() { }

  ngOnInit(): void {
    this.initializeShop();
  }

  initializeShop() {
    this.shopSrv.getBrands();
    this.shopSrv.getTypes();
    this.getProducts();
   
  }

  getProducts() {
     this.shopSrv.getProducts(this.selectedBrands, this.selectedTypes, this.selectedSort).subscribe(
      {
        next: response => this.products = response.data,
        error: error => console.log(error),
        complete: () => console.log('complete.')
      }
    )
  }

  onSortChange(event: MatSelectionListChange) {
    const selectedOption = event.options[0];
    if (selectedOption) {
      this.selectedSort = selectedOption.value;
      this.getProducts();
    }
  }

  openFiltersDialog() {
    const dialogRef = this.dialogSrv.open(FiltersDialogComponent, {
      minWidth: '500px',
      data: {
        selectedBrands: this.selectedBrands,
        selectedTypes: this.selectedTypes
      }
    });

    dialogRef.afterClosed().subscribe({
      next: result => {
        if (result) {
          console.log(result);
          this.selectedBrands = result.selectedBrands;
          this.selectedTypes = result.selectedTypes;
          this.shopSrv.getProducts(this.selectedBrands, this.selectedTypes).subscribe({
            next: response => this.products = response.data,
            error: error => console.log(error)
          });
        }
      }
    })
  }
}
