import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../types/product';

@Component({
  selector: 'app-all-catalog-page',
  templateUrl: './all-catalog-page.component.html',
  styleUrl: './all-catalog-page.component.scss'
})
export class AllCatalogPageComponent {
  allProducts: Product[] | [{ errorMessage: string }] = []

  constructor(productService: ProductService) {
    (async () => {
      this.allProducts = await productService.getAllProducts()
    })()
  }
}
