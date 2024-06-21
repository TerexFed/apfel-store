import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { GadgetService } from './gadget.service';
import { Product } from '../types/product';
import { ProductService } from './product.service';

export type BasketItem = {
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
  constructor(private storageService: StorageService, private gadgetService: GadgetService, private productService: ProductService) { }

  public basket: Array<BasketItem> = this.storageService.getData('basket') || [];

  public get basketLengthHeader(): number {
    return this.basket.reduce((acc, item) => acc + item.count, 0);
  }

  public get totalPrice(): number {
    return this.basket.reduce((acc, item) => item.discountPrice ? acc + item.discountPrice * item.count : acc + item.price * item.count, 0);
  }

  public addToBasket(gadget: BasketItem) {
    const existingItem = this.basket.find(el => el.id === gadget.id);
    if (existingItem) {
      existingItem.count++;
    } else {
      this.basket.push(gadget);
    }
    this.storageService.changeData('basket', JSON.stringify(this.basket));
  }

  public async deleteBasketItem(id: number) {

    const allProducts = await this.productService.getAllProducts();
    const itemToRemove = this.basket.find(el => el.id === id);

    const isError = (item: Product | { errorMessage: string }): item is { errorMessage: string } => {
      return 'errorMessage' in item;
    };

    const validProducts = allProducts.filter(product => !isError(product)) as Product[];

    if (itemToRemove) {
      validProducts.find(el => el.id === id)!.isInCart = false
      this.basket = this.basket.filter(el => el.id !== id);
      this.storageService.changeData('basket', JSON.stringify(this.basket));
    }
  }

  public addCount(id: number) {
    const itemToUpdate = this.basket.find(el => el.id === id);
    if (itemToUpdate) {
      itemToUpdate.count++;
      this.storageService.changeData('basket', JSON.stringify(this.basket));
    }
  }

  public decreaseCount(id: number) {
    const itemToUpdate = this.basket.find(el => el.id === id);
    if (itemToUpdate) {
      itemToUpdate.count--;
      if (itemToUpdate.count < 1) {
        this.deleteBasketItem(id);
      } else {
        this.storageService.changeData('basket', JSON.stringify(this.basket));
      }
    }
  }
}