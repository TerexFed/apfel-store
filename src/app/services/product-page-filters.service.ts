import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root'
})
export class ProductPageFiltersService {

  constructor(private productService: ProductService) { }

  public otherGadgets: Product[] = [];
  public memoryCapacity: string[] = [];

  public async getOtherGadgets(data: Product, category: string) {
    const allProducts = await this.productService.getAllProducts();

    const isError = (item: Product | { errorMessage: string }): item is { errorMessage: string } => {
      return 'errorMessage' in item;
    };

    const validProducts = allProducts.filter(product => !isError(product)) as Product[];

    switch (category) {
      case 'Смартфоны':
      case 'Компьютеры':
      case 'Планшеты':
        this.otherGadgets = validProducts.filter(el => el.name === data.name && el.characteristics[1].value === data.characteristics[1].value);
        break;

      case 'Часы':
        this.otherGadgets = validProducts.filter(el => el.name === data.name && el.characteristics[5].value === data.characteristics[5].value);
        break;

      case 'Гаджеты':
      case 'Аксессуары':
        this.otherGadgets = validProducts.filter(el => el.name === data.name);
        break;
    }
  }

  public async updateMemoryCapacity(data: Product, category: string, memory: string): Promise<void> {
    const allProducts = await this.productService.getAllProducts();

    const isError = (item: Product | { errorMessage: string }): item is { errorMessage: string } => {
      return 'errorMessage' in item;
    };

    const validProducts = allProducts.filter(product => !isError(product)) as Product[];

    switch (category) {
      case 'Смартфоны':
      case 'Компьютеры':
      case 'Планшеты':
        this.otherGadgets = validProducts.filter(el => el.name === data.name && el.characteristics[1].value === memory);
        break;

      case 'Часы':
        this.otherGadgets = validProducts.filter(el => el.name === data.name && el.characteristics[5].value === memory);
        break;
    }
  }

  public async getMemoryCapacity(data: Product, category: string): Promise<string[]> {
    const allProducts = await this.productService.getAllProducts();


    const isError = (item: Product | { errorMessage: string }): item is { errorMessage: string } => {
      return 'errorMessage' in item;
    };

    const validProducts = allProducts.filter(product => !isError(product)) as Product[];
    switch (category) {
      case 'Смартфоны':
      case 'Компьютеры':
      case 'Планшеты':
        this.memoryCapacity = [...new Set(validProducts
          .filter(el => el.name === data.name && el.color === data.color)
          .map(el => el.characteristics[1].value)
          .sort((a, b) => parseFloat(a) - parseFloat(b)))];
        this.updateMemoryCapacity(data, category, data.characteristics[1].value)
        break;

      case 'Часы':
        this.memoryCapacity = [...new Set(validProducts
          .filter(el => el.name === data.name && el.color === data.color)
          .map(el => el.characteristics[5].value)
          .sort((a, b) => parseFloat(a) - parseFloat(b)))];
        this.updateMemoryCapacity(data, category, data.characteristics[5].value)
        break;
    }

    return this.memoryCapacity;
  }



  public clearFilters() {
    this.otherGadgets = [];
    this.memoryCapacity = [];
  }
}
