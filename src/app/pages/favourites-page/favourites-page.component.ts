import { Component, OnInit } from '@angular/core';
import { FavouriteService } from '../../services/favourite.service';
import { Product } from '../../types/product';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-favourites-page',
  templateUrl: './favourites-page.component.html',
  styleUrl: './favourites-page.component.scss',
})
export class FavouritesPageComponent {
  favourites: Product[] = [];
  private favouritesSubscription: Subscription;
  public sort: 'default' | 'price' | 'date' = 'default'

  constructor(public favouriteService: FavouriteService) { }

  ngOnInit(): void {
    this.favourites = this.favouriteService.getFavourites();
    this.favouritesSubscription = this.favouriteService.favourites$.subscribe(
      (favourites) => {
        this.favourites = favourites;
      }
    );
  }

  public sortFavourites() {
    this.favouriteService.filterBy(this.sort)
  }

  ngOnDestroy(): void {
    if (this.favouritesSubscription) {
      this.favouritesSubscription.unsubscribe();
    }
  }

}
