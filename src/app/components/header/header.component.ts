import { Component } from '@angular/core';
import { ModalWindowComponent } from '../../UI/modal-window/modal-window.component';
import { MatDialog } from '@angular/material/dialog';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', './search-result.component.scss', './catalog.component.scss']
})
export class HeaderComponent {
  constructor(public dialog: MatDialog, public basketService: BasketService) { }

  public isHeaderOpen = false
  public openHeader() {
    this.isHeaderOpen = !this.isHeaderOpen
  }

  openModalCallback() {
    window.scrollTo(0, 0)
    this.dialog.open(ModalWindowComponent, { data: { type: 'CallBack' } })
  }
  public count: number = this.basketService.basket.map(el => el.count)[0]
  openModalBasket() {
    window.scrollTo(0, 0)
    this.dialog.open(ModalWindowComponent, { data: { type: 'Basket' } })
  }
  searchResultText = ''

  isSearchResult = false

  isCatalogOpen: boolean = false

  catalogCategoryId: null | number = null

  catalogs = [
    {
      id: 1,
      title: 'Смартфоны',
      link: 'to-somewhere',
      products: [
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 14 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 14 Pro Maxskskdkdkdkdkdkdsfkjfjfjfjfjfjfjfjf',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 14 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 14 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 14 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 14 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 14 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 14 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 14 Pro Maxskskdkdkdkdkdkdsfkjfjfjfjfjfjfjfjf',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 14 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 14 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 14 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 14 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 14 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 14 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 14 Pro Maxskskdkdkdkdkdkdsfkjfjfjfjfjfjfjfjf',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 14 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 14 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 14 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 14 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 14 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 14 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 14 Pro Maxskskdkdkdkdkdkdsfkjfjfjfjfjfjfjfjf',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 14 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 14 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 14 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 14 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 14 Pro Max',
          price: 32445,
        },
      ]
    },
    {
      id: 2,
      title: 'Планшеты',
      link: 'to-somewhere',
      products: [
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 25 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 25 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 25 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 25 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 25 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 25 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 25 Pro Max',
          price: 32445,
        },
      ]
    },
    {
      id: 3,
      title: 'Наушники',
      link: 'to-somewhere',
      products: [
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 36 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 36 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 36 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 36 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 36 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 36 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 36 Pro Max',
          price: 32445,
        },
      ]
    },
    {
      id: 3,
      title: 'Наушники',
      link: 'to-somewhere',
      products: [
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 36 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 36 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 36 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 36 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 36 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 36 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 36 Pro Max',
          price: 32445,
        },
      ]
    },
    {
      id: 3,
      title: 'Наушники',
      link: 'to-somewhere',
      products: [
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 36 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 36 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 36 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 36 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 36 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 36 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 36 Pro Max',
          price: 32445,
        },
      ]
    },
    {
      id: 3,
      title: 'Наушники',
      link: 'to-somewhere',
      products: [
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 36 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 36 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 36 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 36 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 36 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 36 Pro Max',
          price: 32445,
        },
        {
          img: '/assets/gadget-item/iphone.jpg',
          title: 'iPhone 36 Pro Max',
          price: 32445,
        },
      ]
    },
  ]

  removeSearchResultText() {
    this.searchResultText = ''
  }

  changeCatalogCategoryId(newVal: null | number) {
    this.catalogCategoryId = newVal
  }

  changeIsCatalogOpen(newVal?: boolean) {
    this.isCatalogOpen = newVal || !this.isCatalogOpen
    this.changeCatalogCategoryId(null)
  }

  getCatalogItemsById() {
    return this.catalogs.find(catalog => catalog.id === this.catalogCategoryId)?.products.slice(0, 12)
  }

  // getCatalogsTitles() {
  //   return this.catalogs.map(catalog => catalog.title)
  // }

  changeIsSearchResult(newState: boolean) {
    this.isSearchResult = newState
  }

  getSearchResult() {
    return this.inputObjects.filter(product => product.name.includes(this.searchResultText)).slice(0, 5)
  }

  inputObjects = [
    {
      id: 1,
      name: 'iphone1',
      price: 123456,
      image: '/assets/gadget-item/iphone.jpg'
    },
    {
      id: 2,
      name: 'iphone2',
      price: 123456,
      image: '/assets/gadget-item/iphone.jpg'
    },
    {
      id: 3,
      name: 'iphone3',
      price: 123456,
      image: '/assets/gadget-item/iphone.jpg'
    },
    {
      id: 4,
      name: 'iphone4',
      price: 123456,
      image: '/assets/gadget-item/iphone.jpg'
    },
    {
      id: 5,
      name: 'iphone5',
      price: 123456,
      image: '/assets/gadget-item/iphone.jpg'
    },
    {
      id: 6,
      name: 'iphone6',
      price: 123456,
      image: '/assets/gadget-item/iphone.jpg'
    },
    {
      id: 7,
      name: 'tablet1',
      price: 123456,
      image: '/assets/gadget-item/iphone.jpg'
    },
    {
      id: 8,
      name: 'tablet2',
      price: 123456,
      image: '/assets/gadget-item/iphone.jpg'
    },
    {
      id: 9,
      name: 'tablet3',
      price: 123456,
      image: '/assets/gadget-item/iphone.jpg'
    },
    {
      id: 10,
      name: 'tablet4',
      price: 123456,
      image: '/assets/gadget-item/iphone.jpg'
    },
  ]
}