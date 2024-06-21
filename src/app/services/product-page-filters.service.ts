import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root'
})
export class ProductPageFiltersService {

  constructor(private productService: ProductService) { }

  public otherGadgets: Array<any> = []
  public memoryCapacity: Array<any> = []

  public async getOtherGadgets(data: any, category: string) {
    const allProducts = await this.productService.getAllProducts()
    if (((products): products is Product[] => {
      return !('errorMessage' in products[0]);
    })(allProducts)) {
      switch (category) {
        case 'Смартфоны':
        case 'Компьютеры':
        case 'Планшеты': this.otherGadgets = allProducts.filter((el) => el.name === data.name && el.characteristics[1].value === data.characteristics[1].value)
          break

        case 'Часы': this.otherGadgets = allProducts.filter((el) => el.name === data.name && el.characteristics[5].value === data.characteristics[5].value)
          break

        case 'Гаджеты':
        case 'Аксессуары': this.otherGadgets = allProducts.filter((el) => el.name === data.name)
          break
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
      case 'Компьютеры':
      case 'Планшеты':
        this.memoryCapacity = validProducts
          .filter(el => el.name === data.name && el.color === data.color)
          .map(el => el.characteristics[1].value)
          .sort((a, b) => parseFloat(a) - parseFloat(b));
        break;

      case 'Часы':
        this.memoryCapacity = [...new Set(validProducts
          .filter(el => el.name === data.name && el.color === data.color)
          .map(el => el.characteristics[5].value)
          .sort((a, b) => parseFloat(a) - parseFloat(b)))];
        break;
      default:
        console.error('Unknown category:', category);
        this.memoryCapacity = [];
        break;
    }

    return this.memoryCapacity;
  }


  public async updateMemoryCapacity(data: any, category: string, memory: string): Promise<string[]> {

    const allProducts = await this.productService.getAllProducts();

    const isError = (item: Product | { errorMessage: string }): item is { errorMessage: string } => {
      return 'errorMessage' in item;
    };

    const validProducts = allProducts.filter(product => !isError(product)) as Product[];

    switch (category) {
      case 'Смартфоны':
      case 'Компьютеры':
      case 'Планшеты': this.otherGadgets = validProducts.filter((el) => el.name === data.name && el.characteristics[1].value === memory)
        return this.otherGadgets

      case 'Часы': this.otherGadgets = validProducts.filter((el) => el.name === data.name && el.characteristics[5].value === data.characteristics[5].value)
        return this.otherGadgets

    }
    return []

  }

  public clearFilters() {
    this.otherGadgets = []
    this.memoryCapacity = []
  }
}

