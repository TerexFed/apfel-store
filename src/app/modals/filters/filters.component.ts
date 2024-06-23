import { Component, Input } from '@angular/core';
import { Filter, Product } from '../../types/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'modal-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {
  constructor(productService: ProductService) { }
  @Input() products: Product[]
  @Input() firstPrice: number
  @Input() secondPrice: number
  @Input() maxRangeValue: number
  @Input() filters: Filter[]
  @Input() filtersAreOpen: string[]
  @Input() sorting: "" | "incr" | "descr"
  @Input() filterProducts: (products: Product[], filters: Filter[], firstPrice: number, secondPrice: number) => Product[]
  @Input() productsOnChange: () => Promise<Product[]>
  @Input() filtersOnChange: () => Promise<Product[]>
  @Input() newListOfProductsOnChange: () => Promise<void>
  @Input() changeFiltersAreOpen: (filterAreOpenToChange: string) => void
  @Input() priceOnChange: () => void
  @Input() changeProducts: () => void
  @Input() categoryId: number
  @Input() subcategoryId: number
  @Input() changeFirstPrice: (newPrice: number) => void
  @Input() changeSecondPrice: (newPrice: number) => void
}
