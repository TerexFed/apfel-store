import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalWindowComponent } from '../../UI/modal-window/modal-window.component';

@Component({
  selector: 'modal-basket-add',
  templateUrl: './basket-add.component.html',
  styleUrl: './basket-add.component.scss'
})
export class BasketAddComponent {
  constructor(public dialog: MatDialog) { }
  @Input() title: string = ''
  @Input() image: string = ''

  public closeModal() {
    this.dialog.ngOnDestroy()
  }

  public openBasketModal() {
    this.dialog.ngOnDestroy()
    this.dialog.open(ModalWindowComponent, { data: { type: 'Basket' } })
  }
}
