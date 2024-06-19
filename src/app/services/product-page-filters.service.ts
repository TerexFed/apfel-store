import { Injectable } from '@angular/core';
import { GadgetService } from './gadget.service';

@Injectable({
  providedIn: 'root'
})
export class ProductPageFiltersService {

  constructor(private gadgetService: GadgetService) { }

  public otherGadgets: Array<any> = []
  public memoryCapacity: Array<any> = []

  public getOtherGadgets(data: any, category: string) {
    switch (category) {
      case 'Смартфоны': this.otherGadgets = this.gadgetService.gadgets.filter((el) => el.name === data.name && el.characteristics[1].value === data.characteristics[1].value)
        break
      case 'Компьютеры': this.otherGadgets = this.gadgetService.gadgets.filter((el) => el.name === data.name && el.characteristics[1].value === data.characteristics[1].value)
        break
      case 'Планшеты': this.otherGadgets = this.gadgetService.gadgets.filter((el) => el.name === data.name && el.characteristics[1].value === data.characteristics[1].value)
        break
      case 'Часы': this.otherGadgets = this.gadgetService.gadgets.filter((el) => el.name === data.name && el.characteristics[5].value === data.characteristics[5].value)
        break
      case 'Гаджеты': this.otherGadgets = this.gadgetService.gadgets.filter((el) => el.name === data.name)
        break
      case 'Аксессуары': this.otherGadgets = this.gadgetService.gadgets.filter((el) => el.name === data.name)
    }

  };
  public getMemoryCapacity(data: any, category: string) {
    switch (category) {
      case 'Смартфоны': this.memoryCapacity = this.gadgetService.gadgets.filter((el) => el.name === data.name && el.color === data.color).map(el => el.characteristics[1].value).sort(function (a, b) {
        return a - b;
      });
        break
      case 'Компьютеры': this.memoryCapacity = this.gadgetService.gadgets.filter((el) => el.name === data.name && el.color === data.color).map(el => el.characteristics[1].value).sort(function (a, b) {
        return a - b;
      });
        break
      case 'Планшеты': this.memoryCapacity = this.gadgetService.gadgets.filter((el) => el.name === data.name && el.color === data.color).map(el => el.characteristics[1].value).sort(function (a, b) {
        return a - b;
      });
        break
      case 'Часы': this.memoryCapacity = [...new Set(this.gadgetService.gadgets.filter((el) => el.name === data.name && el.color === data.color).map(el => el.characteristics[5].value).sort(function (a, b) {
        return a - b;
      }))]
        break
    }

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

