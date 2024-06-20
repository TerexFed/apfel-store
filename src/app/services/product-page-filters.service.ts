import { Injectable } from '@angular/core';
import { GadgetService } from './gadget.service';
import { ProductService } from './product.service';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root'
})
export class ProductPageFiltersService {

  constructor(private gadgetService: GadgetService, private productService: ProductService) { }

  public otherGadgets: Array<any> = []
  public memoryCapacity: Array<any> = []

  public async getOtherGadgets(data: any, category: string) {
    const allProducts = await this.productService.getAllProducts()
    if (((products): products is Product[] => {
      return !('errorMessage' in products[0]);
    })(allProducts)) {
      switch (category) {
        case 'Смартфоны': this.otherGadgets = allProducts.filter((el) => el.name === data.name && el.characteristics[1].value === data.characteristics[1].value)
          break
        case 'Компьютеры': this.otherGadgets = allProducts.filter((el) => el.name === data.name && el.characteristics[1].value === data.characteristics[1].value)
          break
        case 'Планшеты': this.otherGadgets = allProducts.filter((el) => el.name === data.name && el.characteristics[1].value === data.characteristics[1].value)
          break
        case 'Часы': this.otherGadgets = allProducts.filter((el) => el.name === data.name && el.characteristics[5].value === data.characteristics[5].value)
          break
        case 'Гаджеты': this.otherGadgets = allProducts.filter((el) => el.name === data.name)
          break
        case 'Аксессуары': this.otherGadgets = allProducts.filter((el) => el.name === data.name)
      }
    }
  };
  public async getMemoryCapacity(data: any, category: string): Promise<string[]> {
    const allProducts = await this.productService.getAllProducts();

    const isError = (item: Product | { errorMessage: string }): item is { errorMessage: string } => {
      return 'errorMessage' in item;
    };

    const validProducts = allProducts.filter(product => !isError(product)) as Product[];

    switch (category) {
      case 'Смартфоны':
        this.memoryCapacity = validProducts
          .filter(el => el.name === data.name && el.color === data.color)
          .map(el => el.characteristics[1].value)
          .sort((a, b) => a.localeCompare(b));
        break;
      case 'Компьютеры':
        this.memoryCapacity = this.gadgetService.gadgets
          .filter(el => el.name === data.name && el.color === data.color)
          .map(el => el.characteristics[1].value)
          .sort((a, b) => a.localeCompare(b));
        break;
      case 'Планшеты':
        this.memoryCapacity = this.gadgetService.gadgets
          .filter(el => el.name === data.name && el.color === data.color)
          .map(el => el.characteristics[1].value)
          .sort((a, b) => a.localeCompare(b));
        break;
      case 'Часы':
        this.memoryCapacity = [...new Set(this.gadgetService.gadgets
          .filter(el => el.name === data.name && el.color === data.color)
          .map(el => el.characteristics[5].value)
          .sort((a, b) => a.localeCompare(b)))];
        break;
    }

    return this.memoryCapacity;
  }


  public updateMemoryCapacity(data: any, category: string, memory: string) {
    switch (category) {
      case 'Смартфоны': this.otherGadgets = this.gadgetService.gadgets.filter((el) => el.name === data.name && el.characteristics[1].value === memory)
        break
      case 'Компьютеры': this.otherGadgets = this.gadgetService.gadgets.filter((el) => el.name === data.name && el.characteristics[1].value === memory)
        break
      case 'Планшеты': this.otherGadgets = this.gadgetService.gadgets.filter((el) => el.name === data.name && el.characteristics[1].value === memory)
        break
      case 'Часы': this.otherGadgets = this.gadgetService.gadgets.filter((el) => el.name === data.name && el.characteristics[5].value === data.characteristics[5].value)
        break
    }

  }

  public clearFilters() {
    this.otherGadgets = []
    this.memoryCapacity = []
  }
}

