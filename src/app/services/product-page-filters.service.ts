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
    // console.log(data)
    // console.log(this.gadgetService.gadgets.filter((el) => el.name === data.name && el.color !== data.color && data.characteristics[1].value))
    this.otherGadgets = this.gadgetService.gadgets.filter((el) => el.name === data.name && el.characteristics[1].value === data.characteristics[1].value && el.is_available === data.is_available)
  };
  public getMemoryCapacity(data: any) {
    this.memoryCapacity = this.gadgetService.gadgets.filter((el) => el.name === data.name && el.color === data.color).map(el => el.characteristics[1].value).sort(function (a, b) {
      return a - b;
    });

  }

  public updateMemoryCapacity(data: any, memoryCapacity: string) {
    this.otherGadgets = this.gadgetService.gadgets.filter((el) => el.name === data.name && el.characteristics[1].value === memoryCapacity && el.is_available === data.is_available)
  }
}

