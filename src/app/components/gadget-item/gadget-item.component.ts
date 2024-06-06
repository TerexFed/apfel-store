import { Component, HostListener, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalWindowComponent } from '../../UI/modal-window/modal-window.component';
import { GadgetService } from '../../services/gadget.service';
import { Router } from '@angular/router';
import { BasketService } from '../../services/basket.service';
import { WatchedGadgetsService } from '../../services/watched-gadgets.service';


@Component({
  selector: 'app-gadget-item',
  templateUrl: './gadget-item.component.html',
  styleUrl: './gadget-item.component.scss'
})
export class GadgetItemComponent implements OnInit {
  constructor(public dialog: MatDialog, public router: Router, private basketService: BasketService, private watchedGadgetsService: WatchedGadgetsService) { }
  @Input() gadget: any

  public get5RatingArr() {
    return new Array(5).fill(true)
  }

  public openGadget(id: string) {
    this.watchedGadgetsService.watch(this.gadget)
    this.router.navigate([`gadget/${id}`])
    window.scroll(0, 0)
  }

  windowWidth: number = 1440

  ngOnInit(): void {
    this.windowWidth = globalThis.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;
  }

  openModalAdmission() {
    window.scrollTo(0, 0)
    this.dialog.open(ModalWindowComponent, { data: { type: 'Admission', title: this.gadget.name, image: 'http://localhost:1452/' + this.gadget.images[0] } })
  }
  openModalPriceLower() {
    window.scrollTo(0, 0)
    this.dialog.open(ModalWindowComponent, { data: { type: 'PriceLower' } })
  }
  openModalOneClick() {
    window.scrollTo(0, 0)
    this.dialog.open(ModalWindowComponent, { data: { type: 'OneClick', title: this.gadget.name, image: 'http://localhost:1452/' + this.gadget.images[0], price: this.gadget.price, discountPrice: this.gadget.discount_price } })
  }
  openModalBasketAdd() {
    window.scrollTo(0, 0)
    this.gadget.isInCart = true
    this.basketService.addToBasket({ id: this.gadget.id, title: this.gadget.name, image: 'http://localhost:1452/' + this.gadget.images[0], price: this.gadget.price, discountPrice: this.gadget.discount_price, count: 1, isInCart: true })
    this.dialog.open(ModalWindowComponent, { data: { type: 'BasketAdd', title: this.gadget.name, image: 'http://localhost:1452/' + this.gadget.images[0] } })
  }
}
