import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../core/services/shop.service';
import { Product } from '../../shared/models/products';
import { ProductItemComponent } from './product-item/product-item.component';

@Component({
  selector: 'app-shop',
  imports: [ProductItemComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  products: Product[] = [];

  constructor(private shopSrv: ShopService) { }

  ngOnInit(): void {
    this.initializeShop();
  }

  initializeShop() {
    this.shopSrv.getBrands();
    this.shopSrv.getTypes();
    this.shopSrv.getProducts().subscribe(
      {
        next: response => this.products = response.data,
        error: error => console.log(error),
        complete: () => console.log('complete.')
      }
    )
  }
}
