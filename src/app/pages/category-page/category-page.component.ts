import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Filter, Product, Subcategory, productTypeId } from '../../types/product';
import { FiltersService } from '../../services/filters.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ModalWindowComponent } from '../../UI/modal-window/modal-window.component';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss', './filters-page.component.scss', './pagination.component.scss']
})
export class CategoryPageComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  chips: Subcategory[] = [];
  chosenChipId: number;
  categoryId: string;
  subcategoryId: string

  firstPrice: number = 0;
  secondPrice: number = 0;
  maxRangeValue: number = 0;

  filters: Filter[];
  filtersAreOpen: string[] = [];

  sorting: "" | "incr" | "descr" = ""

  isSorting: boolean = false;

  sortingValues: ["", "incr", "descr"] = ["", "incr", "descr"];

  windowWidth: number = globalThis?.window?.innerWidth || 1300

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;
  }

  private routeSub: Subscription;

  private priceChangeTimeout: any;

  page: number = 1
  perPage: number = 6

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private filtersService: FiltersService,
    public dialog: MatDialog
  ) { }

  filterProducts(products: Product[], filters: Filter[], firstPrice: number, secondPrice: number): Product[] {
    return products.filter(product => {
      const isWithinPriceRange = (product.discount_price || product.price) >= firstPrice && (product.discount_price || product.price) <= secondPrice;
      if (!isWithinPriceRange) {
        return false;
      }
      return filters.every(filter => {
        const activeFilterValues = filter.values.filter(value => value.status).map(value => value.value);
        if (activeFilterValues.length === 0) return true;

        return product.characteristics.some(characteristic => {
          return characteristic.characteristic === filter.name && activeFilterValues.includes(characteristic.value);
        });
      });
    });
  }

  async productsOnChange() {
    let products: Product[] = []
    if (this.subcategoryId) {
      products = await this.productService.getProductsBySubcategoryId(this.subcategoryId)
    } else {
      products = await this.productService.getProductsByCategoryId(this.categoryId)
    }
    return products
  }

  async filtersOnChange() {
    const products = await this.productsOnChange()
    const newProducts = this.filterProducts(products, this.filters, this.firstPrice, this.secondPrice)
    this.products = newProducts
    return newProducts
  }

  async newListOfProductsOnChange() {
    const products = await this.filtersOnChange()

    if (this.sorting === "") this.changeProducts(products)
    if (this.sorting === "incr") this.changeProducts(products.filter(product => product.is_available).sort((productA, productB) => (productA.discount_price || productA.price) - (productB.discount_price || productB.price)))
    if (this.sorting === "descr") this.changeProducts(products.filter(product => product.is_available).sort((productA, productB) => (productB.discount_price || productB.price) - (productA.discount_price || productA.price)))
  }

  changeProducts(products: Product[]) {
    this.products = products
  }

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(async params => {
      const subcategoryId = params.get('subId');
      const categoryId = params.get('id');

      if (!categoryId || +categoryId < 1 || +categoryId > 6) {
        this.router.navigate(['/']);
        return;
      }

      let products: Product[];

      const subcategories = await this.productService.getSubcategoriesByCategoryId(categoryId);
      this.chips = subcategories;

      if (subcategoryId) {
        this.chosenChipId = +subcategoryId;
        const checkIsSubcategoryCorrect = subcategories.find(subcategory => subcategory.id === +subcategoryId);
        if (!checkIsSubcategoryCorrect) {
          this.router.navigate([`/category/${categoryId}`]);
          return;
        }
        products = await this.productService.getProductsBySubcategoryId(subcategoryId);
        this.subcategoryId = subcategoryId
      } else {
        products = await this.productService.getProductsByCategoryId(categoryId);
      }

      if (!products?.length) {
        this.router.navigate(['/']);
        return;
      }

      this.filters = this.filtersService.generateFilters(+categoryId as productTypeId, products);
      this.products = products;
      this.maxRangeValue = this.secondPrice = Math.max(...products.map(product => product.price));
      this.categoryId = categoryId;
    });
  }

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
    if (this.priceChangeTimeout) clearTimeout(this.priceChangeTimeout)
    this.priceChangeTimeout = setTimeout(() => {
      this.newListOfProductsOnChange()
    }, 500);
  }



  getPaginationLength() {
    return Math.ceil(this.products.length / this.perPage)
  }

  getPaginationProducts() {
    return this.products.slice((this.page - 1) * this.perPage, (this.page - 1) * this.perPage + this.perPage)
  }

  getPagination() {
    const length = this.getPaginationLength()
    const page = this.page
    if (length <= 5) return new Array(length).fill(true).map((_, ind) => ind + 1)
    if (page <= 3) return [1, 2, 3, '...', length]
    if (page >= length - 2) return [1, '...', length - 2, length - 1, length]
    return [1, '...', page - 1, page, page + 1, '...', length]
  }

  changePage(newPage: number) {
    this.page = newPage
    window.scroll(0, 0)
  }

  changeFirstPrice(newPrice: number) {
    if (this.priceChangeTimeout) clearTimeout(this.priceChangeTimeout)
    this.priceChangeTimeout = setTimeout(() => {
      this.firstPrice = newPrice
    }, 500);
  }

  changeSecondPrice(event: number) {
    if (this.priceChangeTimeout) clearTimeout(this.priceChangeTimeout)
    this.priceChangeTimeout = setTimeout(() => {
      this.secondPrice = event
    }, 500);
  }


  openFiltersModal() {
    window.scrollTo(0, 0);
    this.dialog.open(ModalWindowComponent, {
      data: {
        type: 'Filters',
        products: this.products,
        firstPrice: this.firstPrice,
        secondPrice: this.secondPrice,
        maxRangeValue: this.maxRangeValue,
        filters: this.filters,
        filtersAreOpen: this.filtersAreOpen,
        sorting: this.sorting,
        filterProducts: this.filterProducts.bind(this),
        productsOnChange: this.productsOnChange.bind(this),
        filtersOnChange: this.filtersOnChange,
        newListOfProductsOnChange: this.newListOfProductsOnChange,
        changeFiltersAreOpen: this.changeFiltersAreOpen,
        priceOnChange: this.priceOnChange,
        categoryId: this.categoryId,
        subcategoryId: this.subcategoryId,
        changeProducts: this.changeProducts.bind(this),
        changeFirstPrice: this.changeFirstPrice.bind(this),
        changeSecondPrice: this.changeSecondPrice.bind(this),
      }
    });
  }
}
