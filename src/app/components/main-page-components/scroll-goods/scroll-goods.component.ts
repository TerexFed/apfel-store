import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'scroll-goods',
  templateUrl: './scroll-goods.component.html',
  styleUrl: './scroll-goods.component.scss'
})
export class ScrollGoodsComponent {
  constructor(private router: Router) { }

  public scrollGoods: Array<any> = [
    { id: 0, image: '../../../../assets/main-page/scroll-goods/big_iphone.svg', price: 137900 },
    { id: 1, image: '../../../../assets/main-page/scroll-goods/ipad.svg', price: 81000, text: 'Ipad Pro 11' },
    { id: 2, image: '../../../../assets/main-page/scroll-goods/macbook.svg', price: 129999, text: 'MackBook Pro' }
  ]

  public currentId: number = 0

  public animateScrollRight: boolean = false;
  public animateScrollLeft: boolean = false;

  public scrollRight() {
    this.animateScrollRight = true;
    setTimeout(() => {
      this.animateScrollRight = false;
      this.currentId = (this.currentId + 1) % this.scrollGoods.length;
    }, 800);
  }

  public scrollLeft() {
    this.animateScrollLeft = true;
    setTimeout(() => {
      this.animateScrollLeft = false;
      this.currentId = (this.currentId - 1 + this.scrollGoods.length) % this.scrollGoods.length;
    }, 800);
  }

  public navigateToGadget(id: number) {
    if (id === 0) {
      this.router.navigate([`/category/${2}/${17}`])
    }
    if (id === 1) {
      this.router.navigate([`/category/${4}/${33}`])
    }
    if (id === 2) {
      this.router.navigate([`/category/${3}/${26}`])
    }
  }
}
