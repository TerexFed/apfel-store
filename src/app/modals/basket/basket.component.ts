import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BasketItem, BasketService } from '../../services/basket.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalWindowComponent } from '../../UI/modal-window/modal-window.component';

@Component({
  selector: 'modal-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent{
  constructor(public router: Router, public basketService: BasketService, public dialog: MatDialog) { }

  public deliveryType: string = 'Доставка'

  public openModalBusketSuccess() {
    this.dialog.ngOnDestroy()
    this.dialog.open(ModalWindowComponent, { data: { type: 'BasketSuccess' } })
  }
}
