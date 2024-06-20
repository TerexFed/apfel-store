import { Component } from '@angular/core';
import { ModalWindowComponent } from '../../UI/modal-window/modal-window.component';
import { MatDialog } from '@angular/material/dialog';
import { BasketService } from '../../services/basket.service';
import { FiltersService } from '../../services/filters.service';
import { Product } from '../../types/product';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', './search-result.component.scss', './catalog.component.scss']
})
export class HeaderComponent {
  constructor(public dialog: MatDialog, public basketService: BasketService, public fitersService: FiltersService) {
    (async () => {
      this.catalogs = await fitersService.getAllCategories()
    })()
  }

  public isHeaderOpen = false
  public openHeader() {
    this.isHeaderOpen = !this.isHeaderOpen
  }

  openModalCallback() {
    window.scrollTo(0, 0)
    this.dialog.open(ModalWindowComponent, { data: { type: 'CallBack' } })
  }

  openModalTradeIn() {
    window.scroll(0, 0)
    this.dialog.open(ModalWindowComponent, { data: { type: 'Trade-In' } })
  }

  public count: number = this.basketService.basket.map(el => el.count)[0]

  public openModalBasket() {
    window.scrollTo(0, 0)
    this.dialog.open(ModalWindowComponent, { data: { type: 'Basket' } })
  }

  isCatalogOpen: boolean = false

  catalogCategoryId: null | string = null

  getCatalogNames() {
    return this.catalogs.map(catalog => catalog[0])
  }

  getCatalogProducts(): Product[] {
    const categoryProductsToFind = this.catalogs.find((catalog: [string, Product[]]) => catalog[0] === this.catalogCategoryId);
    return categoryProductsToFind ? categoryProductsToFind[1] : []
  }

  catalogs: [string, Product[]][] = []

  changeCatalogCategoryId(newVal: null | string) {
    this.catalogCategoryId = newVal
  }

  changeIsCatalogOpen(newVal?: boolean) {
    this.isCatalogOpen = newVal || !this.isCatalogOpen
    this.changeCatalogCategoryId(null)
  }

  searchResultText = ''

  isSearchResult = false

  searchedResultList: Product[] = []

  changeIsSearchResult(newState: boolean) {
    this.isSearchResult = newState
  }

  async getSearchResult(): Promise<void> {
    this.searchedResultList = await this.fitersService.getSearchedProducts(this.searchResultText)
  }


  removeSearchResultText() {
    this.searchResultText = ''
  }
}