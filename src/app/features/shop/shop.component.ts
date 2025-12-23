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
import { ShopParams } from '../../shared/models/shopParams';

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

  shopParams = new ShopParams();

  ngOnInit(): void {
    this.initializeShop();
  }

  initializeShop() {
    this.shopSrv.getBrands();
    this.shopSrv.getTypes();
    this.getProducts();
   
  }

  getProducts() {
     this.shopSrv.getProducts(this.shopParams).subscribe(
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
      this.shopParams.sort = selectedOption.value;
      this.getProducts();
    }
  }

  openFiltersDialog() {
    const dialogRef = this.dialogSrv.open(FiltersDialogComponent, {
      minWidth: '500px',
      data: {
        selectedBrands: this.shopParams.brands,
        selectedTypes: this.shopParams.types
      }
    });

    dialogRef.afterClosed().subscribe({
      next: result => {
        if (result) {
          console.log(result);
          this.shopParams.brands = result.selectedBrands;
          this.shopParams.types = result.selectedTypes;
          this.shopSrv.getProducts(this.shopParams).subscribe({
            next: response => this.products = response.data,
            error: error => console.log(error)
          });
        }
      }
    })
  }
}
