import { Component } from '@angular/core';

@Component({
  selector: 'scroll-goods',
  templateUrl: './scroll-goods.component.html',
  styleUrl: './scroll-goods.component.scss'
})
export class ScrollGoodsComponent {
  public scrollGoods: Array<any> = [
    { id: 0, image: '../../../../assets/main-page/scroll-goods/big_iphone.svg', price: 137900 },
    { id: 1, image: '../../../../assets/main-page/scroll-goods/ipad.svg', price: 137900, text: 'Ipad Pro 11' },
    { id: 2, image: '../../../../assets/main-page/scroll-goods/macbook.svg', price: 137900, text: 'MackBook Pro' }
  ]

  public currentId: number = 0


  public scrollRight() {
    this.currentId = (this.currentId + 1) % this.scrollGoods.length;
  }

  public scrollLeft() {
    this.currentId = (this.currentId - 1 + this.scrollGoods.length) % this.scrollGoods.length;
  }
}
