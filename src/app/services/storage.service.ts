import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BasketItem } from './basket.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(@Inject(PLATFORM_ID) public platformId: any) { }

  public data:any 

  public changeData(key:string, newData: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, newData)
      this.data = newData
    }
  }

  public getData(key:string): Array<BasketItem> | any {
    if (isPlatformBrowser(this.platformId)) {
      let localData = JSON.parse(localStorage.getItem(key)!)
      this.data = localData
      return localData
    }
  }
}
