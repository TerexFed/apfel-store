import { Component } from '@angular/core';

@Component({
  selector: 'app-gadget-item',
  templateUrl: './gadget-item.component.html',
  styleUrl: './gadget-item.component.scss'
})
export class GadgetItemComponent {
  gadget: any = {
    rating: 4.3,
    reviews: 14,
    isFavorite: false,
    name: 'Apple iPhone XS Max 256 ГБ золотой',
    isAvailable: true,
    guarantee: 1,
    price: 1233,
    discountPrice: 333,
    isInCart: false,
  }

  get5RatingArr() {
    return new Array(Math.round(5)).fill(true)
  }
}
