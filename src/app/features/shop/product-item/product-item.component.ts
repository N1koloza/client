import { Component, Input } from '@angular/core';
import { Product } from '../../../shared/models/products';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-item',
  imports: [
    CurrencyPipe, 
    MatCard, 
    MatCardContent, 
    MatButton, 
    MatIcon,
    RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  @Input() product?: Product;
}
