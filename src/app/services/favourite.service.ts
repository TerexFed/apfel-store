import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Subject } from 'rxjs';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root',
})
export class FavouriteService {
  private readonly storageKey = 'favourites';
  private favouritesSubject = new Subject<any[]>();
  favourites$ = this.favouritesSubject.asObservable();

  constructor(private storageService: StorageService) { }

  private emitFavouritesChange() {
    this.favouritesSubject.next(this.getFavourites());
  }

  getFavourites() {
    return this.storageService.getData(this.storageKey) || [];
  }

  addToFavourites(gadget: any) {
    let favourites = this.getFavourites();
    if (!favourites.find((item: any) => item.id === gadget.id)) {
      favourites.push(gadget);
      gadget.isFavorite = true;
      this.storageService.changeData(this.storageKey, JSON.stringify(favourites));
      this.emitFavouritesChange();
    }
  }

  removeFromFavourites(gadget: any) {
    let favourites = this.getFavourites();
    favourites = favourites.filter((item: any) => item.id !== gadget.id);
    gadget.isFavorite = false;
    this.storageService.changeData(this.storageKey, JSON.stringify(favourites));
    this.emitFavouritesChange();
  }

  isFavourite(gadget: any) {
    let favourites = this.getFavourites();
    return favourites.find((item: any) => item.id === gadget.id) !== undefined;
  }

  filterBy(type: 'default' | 'price' | 'date') {
    let favourites = this.getFavourites();
    switch (type) {
      case 'default':
        favourites.sort((favouriteA: Product, favouriteB: Product) => favouriteA.id - favouriteB.id);
        break;
      case 'price':
        favourites.sort((favouriteA: Product, favouriteB: Product) => (favouriteA.discount_price || favouriteA.price) - (favouriteB.discount_price || favouriteB.price));
        break;
      case 'date':
        favourites.sort((favouriteA: Product, favouriteB: Product) => new Date(favouriteA.createdAt).getTime() - new Date(favouriteB.createdAt).getTime());
        break;
    }
    this.storageService.changeData(this.storageKey, JSON.stringify(favourites));
    this.emitFavouritesChange();
  }
}
