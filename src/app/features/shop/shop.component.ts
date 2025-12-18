import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../core/servuces/shop.service';
import { Product } from '../../shared/models/products';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-shop',
  imports: [ MatCard],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  products: Product[] = [];

  constructor(private shopSrv: ShopService) {}

  ngOnInit(): void {
    this.shopSrv.getProducts().subscribe(
      {
        next: response => this.products = response.data,
        error: error => console.log(error),
        complete: () => console.log('complete.')
      }
    )
  }
}
