import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})

export class WatchedGadgetsService {
  constructor(private storageService: StorageService) { }

  public watchedGadgets: Array<any> = this.storageService.getData('watchedGadgets') || []

  public watch(gadget: any) {
    const existingItem = this.watchedGadgets.find(el => el.id === gadget.id);
    if (!existingItem) {
      if (this.watchedGadgets.length >= 5) {
        this.watchedGadgets = [...this.watchedGadgets.slice(1), gadget];
      } else {
        this.watchedGadgets.push(gadget);
      }
    }
    this.storageService.changeData('watchedGadgets', JSON.stringify(this.watchedGadgets))
  }
}
