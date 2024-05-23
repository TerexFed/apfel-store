import { Component, TemplateRef } from '@angular/core';
import { ModalWindowService } from '../../services/modal-window.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', './search-result.component.scss']
})
export class HeaderComponent {
  constructor(public modalService: ModalWindowService) { }
  public isHeaderOpen = false
  public openHeader() {
    this.isHeaderOpen = !this.isHeaderOpen
  }
  public openModal(modalTemplate: TemplateRef<any>) {
    this.modalService.open(modalTemplate)
  }

  searchResultText = ''

  isSearchResult = false

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
