import { Injectable } from '@angular/core';
import { GadgetService } from './gadget.service';

@Injectable({
  providedIn: 'root'
})
export class ProductPageFiltersService {

  constructor(private gadgetService: GadgetService) { }

  public otherGadgets: Array<any> = []
  public memoryCapacity: Array<any> = []

  public getOtherGadgets(data: any) {
    this.otherGadgets = this.gadgetService.gadgets.filter((el) => el.name === data.name && el.characteristics[1].value === data.characteristics[1].value && el.is_available === true)
  };
  public getMemoryCapacity(data: any) {
    if (data.characteristics[5].characteristic === 'Циферблат') {
      this.memoryCapacity = this.gadgetService.gadgets.filter((el) => el.name === data.name && el.color === data.color && el.is_available === true).map(el => el.characteristics[5].value).sort(function (a, b) {
        return a - b;
      });
    }
    else {
      this.memoryCapacity = this.gadgetService.gadgets.filter((el) => el.name === data.name && el.color === data.color && el.is_available === true).map(el => el.characteristics[1].value).sort(function (a, b) {
        return a - b;
      });
    }
  }

  public updateMemoryCapacity(data: any, memoryCapacity: string) {
    this.otherGadgets = this.gadgetService.gadgets.filter((el) => el.name === data.name && el.characteristics[1].value === memoryCapacity && el.is_available === true)
  }

  public updateWatchSize(data: any, size: string) {
    this.otherGadgets = this.gadgetService.gadgets.filter((el) => el.name === data.name && el.characteristics[5].value === size && el.is_available === true)
  }
}

