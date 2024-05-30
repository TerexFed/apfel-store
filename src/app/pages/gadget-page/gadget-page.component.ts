import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GadgetService } from '../../services/gadget.service';
import { ModalWindowComponent } from '../../UI/modal-window/modal-window.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-gadget-page',
  templateUrl: './gadget-page.component.html',
  styleUrl: './gadget-page.component.scss'
})
export class GadgetPageComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, public gadgetService: GadgetService, public dialog: MatDialog) { }
  public currentPic: string = ''

  ngOnInit(): void {
    if (this.route.snapshot.params.id <= 86) {
      this.gadgetService.getGadgetByID(this.route.snapshot.params.id)

    }
    else {
      this.router.navigate(['/'])
    }
  }

  openModalOneClick() {
    window.scrollTo(0, 0)
    this.dialog.open(ModalWindowComponent, { data: { type: 'OneClick', title: this.gadgetService.gadget.name, image: 'http://localhost:1452/' + this.gadgetService.gadget.images[0], price: this.gadgetService.gadget.price, discountPrice: this.gadgetService.gadget.discount_price } })
  }
  openModalBasketAdd() {
    window.scrollTo(0, 0)
    this.dialog.open(ModalWindowComponent, { data: { type: 'BasketAdd', title: this.gadgetService.gadget.name, image: 'http://localhost:1452/' + this.gadgetService.gadget.images[0] } })
  }
  openModalCredit() {
    window.scrollTo(0, 0)
    this.dialog.open(ModalWindowComponent, { data: { type: 'Credit', title: this.gadgetService.gadget.name, image: 'http://localhost:1452/' + this.gadgetService.gadget.images[0], price: this.gadgetService.gadget.price, discountPrice: this.gadgetService.gadget.discount_price} })
  }
}
