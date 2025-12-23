import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../../shared/models/pagination';
import { Product } from '../../shared/models/products';
import { ShopParams } from '../../shared/models/shopParams';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api/';
  types: string[] = [];
  brands: string[] = [];

  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();

    if (shopParams.brands?.length) {
      params = params.append('brands', shopParams.brands.join(','));
    }

    if (shopParams.types?.length) {
      params = params.append('types', shopParams.types.join(','));
    }

    if (shopParams.sort) {
      params = params.append('sort', shopParams.sort);
    }


    params = params.append('PageSize', 20);
    return this.http.get<Pagination<Product>>(this.baseUrl + 'products', { params });
  }

  getBrands() {
    if (this.brands.length > 0) return;
    return this.http.get<string[]>(this.baseUrl + 'products/brands').subscribe({
      next: response => this.brands = response
    });
  }

  getTypes() {
    if (this.types.length > 0) return;
    return this.http.get<string[]>(this.baseUrl + 'products/types').subscribe({
      next: response => this.types = response
    });
  }
}
