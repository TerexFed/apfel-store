import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../types/product';


@Component({
  selector: 'app-discount-page',
  templateUrl: './discount-page.component.html',
  styleUrls: ['./discount-page.component.scss']
})
export class DiscountPageComponent {
  discountProducts: Product[] | [{ errorMessage: string }] = []
  page: number = 1
  perPage: number = 6

  constructor(productService: ProductService) {
    (async () => {
      this.discountProducts = await productService.getAllDiscounts()
    })()
  }
}
