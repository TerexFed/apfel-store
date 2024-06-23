import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalWindowComponent } from '../../UI/modal-window/modal-window.component';
import { BasketService } from '../../services/basket.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../types/product';
import { Router } from '@angular/router';
import { GadgetService } from '../../services/gadget.service';
import { ProductPageFiltersService } from '../../services/product-page-filters.service';
import { WatchedGadgetsService } from '../../services/watched-gadgets.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', './search-result.component.scss', './catalog.component.scss']
})
export class HeaderComponent implements OnInit {
  public isHeaderOpen = false;
  public count: number = 0;
  public catalogs: [string, Product[]][] = [];
  public isCatalogOpen: boolean = false;
  public catalogCategoryId: null | string = null;
  public searchResultText: string = '';
  public isSearchResult: boolean = false;
  public searchedResultList: Product[] = [];

  constructor(
    public dialog: MatDialog,
    public basketService: BasketService,
    public productService: ProductService,
    public router: Router,
    private gadgetService: GadgetService,
    private watchedGadgetService: WatchedGadgetsService,
    public productFilters: ProductPageFiltersService
  ) { }

  public navigateToCategory(id: number) {
    this.router.navigate([`/category/${id}`])
  }

  async ngOnInit(): Promise<void> {
    const categories = await this.productService.getAllCategories();
    this.catalogs = categories;
    this.count = this.basketService.basket.length > 0 ? this.basketService.basket.map(el => el.count)[0] : 0;
  }

  private isError(categories: any): categories is [{ errorMessage: string }] {
    return Array.isArray(categories) && categories.length > 0 && 'errorMessage' in categories[0];
  }

  public openHeader(): void {
    this.isHeaderOpen = !this.isHeaderOpen;
  }

  public openGadget(id: string) {
    (async () => {
      const content = await this.productService.getProductById(id)
      if (!content) {
        this.router.navigate(['/'])
        return;
      }
      this.gadgetService.getGadgetByID(content.id.toString())
      this.watchedGadgetService.watch(content)
      this.productFilters.getOtherGadgets(content, content.category)
      this.productFilters.getMemoryCapacity(content, content.category)
    })()
  }

  public openModalCallback(): void {
    window.scrollTo(0, 0);
    this.dialog.open(ModalWindowComponent, { data: { type: 'CallBack' } });
  }

  public openModalTradeIn(): void {
    window.scrollTo(0, 0);
    this.dialog.open(ModalWindowComponent, { data: { type: 'Trade-In' } });
  }

  public openModalBasket(): void {
    window.scrollTo(0, 0);
    this.dialog.open(ModalWindowComponent, { data: { type: 'Basket' } });
  }

  public getCatalogNames(): string[] | undefined {
    if (!this.isError(this.catalogs)) {
      return this.catalogs.map(catalog => catalog[0]);
    }
  }

  public getCatalogProducts(): Product[] {
    if (this.isError(this.catalogs)) {
      return [];
    }
    const categoryProductsToFind = this.catalogs.find(
      (catalog): catalog is [string, Product[]] => catalog[0] === this.catalogCategoryId
    );
    return categoryProductsToFind ? categoryProductsToFind[1] : [];
  }

  public changeCatalogCategoryId(newVal: null | string): void {
    this.catalogCategoryId = newVal;
  }

  public changeIsCatalogOpen(newVal?: boolean): void {
    this.isCatalogOpen = newVal !== undefined ? newVal : !this.isCatalogOpen;
    this.changeCatalogCategoryId(null);
  }

  getCatalogLink() {
    if (this.catalogCategoryId === "Смартфоны") return `/category/2`
    if (this.catalogCategoryId === "Компьютеры") return `/category/3`
    if (this.catalogCategoryId === "Планшеты") return `/category/4`
    if (this.catalogCategoryId === "Часы") return `/category/5`
    if (this.catalogCategoryId === "Гаджеты") return `/category/6`
    if (this.catalogCategoryId === "Аксессуары") return `/category/1`
  }

  stopPropagationLink(e: MouseEvent, id: number) {
    // e.stopImmediatePropagation()
    // console.log('stopPropagationLink');
    // this.router.navigate([`gadget/${id}`])
  }

  public changeIsSearchResult(newState: boolean): void {
    setTimeout(() => this.isSearchResult = newState, 0);
  }

  public async getSearchResult(): Promise<void> {
    this.searchedResultList = await this.productService.getSearchedProducts(this.searchResultText);
  }

  public removeSearchResultText(): void {
    this.searchResultText = '';
  }
}
