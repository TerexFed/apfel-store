import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BottomSheetService {
  isBasketOpen = false;
  isCatalogOpen = false;

  openBasket() {
    this.isBasketOpen = true;
    this.isCatalogOpen = false;
  }
  closeBasket(){
    this.isBasketOpen = false
  }

  openCatalog() {
    this.isBasketOpen = false;
    this.isCatalogOpen = true;
  }
  closeCatalog(){
    this.isCatalogOpen = false
  }

  closeBottomSheet() {
    this.isBasketOpen = false;
    this.isCatalogOpen = false;
  }
}
