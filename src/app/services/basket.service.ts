import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { GadgetService } from './gadget.service';

type BasketItem = {
  id: number;
  title: string;
  image: string;
  price: number;
  discountPrice: number;
  count: number;
  isInCart: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class BasketService {
  constructor(private storageService: StorageService, private gadgetService: GadgetService) { }

  public basket: Array<BasketItem> = [] || this.storageService.getData('basket')

  public basketLengthHeader: number = 0

  public totalPrice: number = 0

  public addToBasket(gadget: BasketItem) {
    if (this.basket.filter(el => el.id === gadget.id)[0] !== undefined) {
      this.basket.filter(el => el.id === gadget.id)[0].count++
      this.storageService.changeData('basket', JSON.stringify(this.basket))
      this.basketLengthHeader++
      this.totalPrice += gadget.price
    }
    else {
      this.basket.push(gadget)
      this.storageService.changeData('basket', JSON.stringify(this.basket))
      this.basketLengthHeader++
      this.totalPrice += gadget.price
    }

  }

  public deleteBasketItem(id: number) {
    this.gadgetService.gadgets.filter(el => el.id === id)[0].isInCart = false
    this.basket = this.basket.filter(el => el.id !== id)
  }

  public addCount(id: number) {
    this.basket.filter(el => el.id === id)[0].count++
    this.totalPrice += this.basket.filter(el => el.id === id)[0].price
    this.basketLengthHeader++
  }
  public decreaseCount(id: number) {
    this.basket.filter(el => el.id === id)[0].count--
    this.basketLengthHeader--
    this.totalPrice -= this.basket.filter(el => el.id === id)[0].price
    if (this.basket.filter(el => el.id === id)[0].count === 0) {
      this.deleteBasketItem(id)
    }
  }

  public getCount(id: number) {
    console.log(this.basket.filter(el => el.id === id)[0].count)
    return this.basket.filter(el => el.id === id)[0].count
  }
}
