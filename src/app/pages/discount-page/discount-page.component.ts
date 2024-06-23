import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Filter, Product, productTypeId } from '../../types/product';
import { FiltersService } from '../../services/filters.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-discount-page',
  templateUrl: './discount-page.component.html',
  styleUrls: ['./discount-page.component.scss', './filters-page.component.scss', './pagination.component.scss']
})
export class DiscountPageComponent implements OnDestroy {
  products: Product[] = [];
  categoryId: string;

  firstPrice: number = 0;
  secondPrice: number = 0;
  maxRangeValue: number = 0;

  filters: Filter[];
  filtersAreOpen: string[] = [];

  private routeSub: Subscription;

  private priceChangeTimeout: any;

  page: number = 1;
  perPage: number = 6;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private filtersService: FiltersService,
  ) {}

  filterProducts(
    products: Product[],
    filters: Filter[],
    firstPrice: number,
    secondPrice: number
  ): Product[] {
    return products.filter((product) => {
      const isWithinPriceRange =
        (product.discount_price || product.price) >= firstPrice &&
        (product.discount_price || product.price) <= secondPrice;
      if (!isWithinPriceRange) {
        return false;
      }
      return filters.every((filter) => {
        const activeFilterValues = filter.values
          .filter((value) => value.status)
          .map((value) => value.value);
        if (activeFilterValues.length === 0) return true;

        return product.characteristics.some((characteristic) => {
          return (
            characteristic.characteristic === filter.name &&
            activeFilterValues.includes(characteristic.value)
          );
        });
      });
    });
  }

  async productsOnChange() {
    return this.productService.getProductsByCategoryId(this.categoryId);
  }

  async filtersOnChange() {
    const products = await this.productsOnChange();
    const newProducts = this.filterProducts(
      products,
      this.filters,
      this.firstPrice,
      this.secondPrice
    );
    this.products = newProducts;
    return newProducts;
  }

  async newListOfProductsOnChange() {
    const products = await this.filtersOnChange();
    this.products = products;
  }

  // ngOnInit(): void {
  //   const products = this.productService.getAllDiscounts();
  //   this.products = products;
  // }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  changeFiltersAreOpen(filterAreOpenToChange: string) {
    if (this.filtersAreOpen.includes(filterAreOpenToChange)) {
      this.filtersAreOpen = this.filtersAreOpen.filter(filter => filter !== filterAreOpenToChange);
    } else {
      this.filtersAreOpen.push(filterAreOpenToChange);
    }
  }

  priceOnChange() {
    if (this.priceChangeTimeout) clearTimeout(this.priceChangeTimeout);
    this.priceChangeTimeout = setTimeout(() => {
      this.newListOfProductsOnChange();
    }, 500);
  }

  getPaginationLength() {
    return Math.ceil(this.products.length / this.perPage);
  }

  getPaginationProducts() {
    return this.products.slice((this.page - 1) * this.perPage, (this.page - 1) * this.perPage + this.perPage);
  }

  getPagination() {
    const length = this.getPaginationLength();
    const page = this.page;
    if (length <= 5) return new Array(length).fill(true).map((_, ind) => ind + 1);
    if (page <= 3) return [1, 2, 3, '...', length];
    if (page >= length - 2) return [1, '...', length - 2, length - 1, length];
    return [1, '...', page - 1, page, page + 1, '...', length];
  }

  changePage(newPage: number) {
    this.page = newPage;
    window.scroll(0, 0);
  }

}
