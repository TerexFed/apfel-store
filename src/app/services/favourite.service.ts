import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class FavouriteService {
  private readonly storageKey = 'favourites';

  constructor(private storageService: StorageService) {}

  getFavourites() {
    return this.storageService.getData(this.storageKey) || [];
  }

  addToFavourites(gadget: any) {
    let favourites = this.getFavourites();
    if (!favourites.find((item: any) => item.id === gadget.id)) {
      favourites.push(gadget);
      this.storageService.changeData(
        this.storageKey,
        JSON.stringify(favourites)
      );
      gadget.isFavorite = true;
    }
  }

  removeFromFavourites(gadget: any) {
    let favourites = this.getFavourites();
    favourites = favourites.filter((item: any) => item.id !== gadget.id);
    this.storageService.changeData(this.storageKey, JSON.stringify(favourites));
    gadget.isFavorite = false;
  }

  isFavourite(gadget: any) {
    let favourites = this.getFavourites();
    return favourites.find((item: any) => item.id === gadget.id) !== undefined;
  }
}
