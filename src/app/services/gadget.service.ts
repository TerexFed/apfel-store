import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GadgetService {
  public gadgets: Array<any> = []
  public gadget: any

  public getAllGadgets() {
    fetch('http://localhost:1452/api/products')
      .then(res => res.json())
      .then(data => this.gadgets = data)
      .then(() => this.gadgets.map(el => el.isInCart = false))
  }

  public getGadgetByID(id: string) {
    fetch('http://localhost:1452/api/products/' + id)
      .then(res => res.json())
      .then(data => this.gadget = data)
  }
}
