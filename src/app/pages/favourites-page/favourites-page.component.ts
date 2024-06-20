import { Component, OnInit } from '@angular/core';
import { FavouriteService } from '../../services/favourite.service';
@Component({
  selector: 'app-favourites-page',
  templateUrl: './favourites-page.component.html',
  styleUrl: './favourites-page.component.scss'
})
export class FavouritesPageComponent {
  favourites: any[] = [];

  constructor(private favouriteService: FavouriteService) { }

  ngOnInit(): void {
    this.favourites = this.favouriteService.getFavourites();
  }

  trackByGadgetId(index: number, gadget: any): string {
    return gadget.id;
  }
}
