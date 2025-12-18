import { Component, effect, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layout/header/header.component";
import { HttpClient } from '@angular/common/http';
import { Product } from './shared/models/products';
import { Pagination } from './shared/models/pagination';
import { ShopService } from './core/servuces/shop.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  protected readonly title = signal('Skinet');
  products: Product[] = [];

  constructor(private shopSrv: ShopService) {
    effect(
      () => {
        document.title = this.title();
      }
    );
  }

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
