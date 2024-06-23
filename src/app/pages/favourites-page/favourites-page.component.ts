import { Component, OnInit } from '@angular/core';
import { FavouriteService } from '../../services/favourite.service';
import { Product } from '../../types/product';
@Component({
  selector: 'app-favourites-page',
  templateUrl: './favourites-page.component.html',
  styleUrl: './favourites-page.component.scss',
})
export class FavouritesPageComponent {
  favourites: any[] = [];
  filteredFavourites: Product[] = [];
  firstPrice: number = 0;
  secondPrice: number = 0;
  sorting: '' | 'price' | 'date' = '';

  constructor(private favouriteService: FavouriteService) {}

  ngOnInit(): void {
    this.favourites = this.favouriteService.getFavourites();
  }

  trackByGadgetId(index: number, gadget: any): string {
    return gadget.id;
  }

  // loadFavourites(): void {
  //   this.favourites = this.favouriteService.getFavourites();
  // }

  // applyFilters(): void {
  //   this.filteredFavourites = this.favourites.filter((product) => {
  //     const isWithinPriceRange =
  //       (product.discount_price || product.price) >= this.firstPrice &&
  //       (product.discount_price || product.price) <= this.secondPrice;
  //     return isWithinPriceRange;
  //   });

  //   this.sortFilteredFavourites();р
  // }

  // sortFilteredFavourites(): void {
  //   if (this.sorting === 'price') {
  //     this.filteredFavourites.sort(
  //       (a, b) => (a.discount_price || a.price) - (b.discount_price || b.price)
  //     );
  //   } else if (this.sorting === 'date') {
  //     this.filteredFavourites.sort((a, b) => {
  //       const dateA = new Date(a.createdAt).getTime();
  //       const dateB = new Date(b.createdAt).getTime();
  //       return dateB - dateA;
  //     });
  //   }
  // }
}
