import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GadgetService {
  public gadgets: Array<any> = []
  public gadget: any

  public getAllGadgets() {
    fetch('https://angular-final-project-backend.onrender.com/api/products')
      .then(res => res.json())
      .then(data => this.gadgets = data)
      .then(() => this.gadgets.map(el => el.isInCart = false))
  }

  public getGadgetByID(id: string) {
    fetch('https://angular-final-project-backend.onrender.com/api/products/' + id)
      .then(res => res.json())
      .then(data => this.gadget = data)
  }
}
