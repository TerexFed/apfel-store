import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../types/product';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  popularProductList: Product[] | [{ errorMessage: string }] = []
  newestProdcts: Product[] | [{ errorMessage: string }] = []

  constructor(productService: ProductService) {
    (async () => {
      this.popularProductList = await productService.getPopularProducts()
      this.newestProdcts = await productService.getNewestProducts()
    })()
  }
}
