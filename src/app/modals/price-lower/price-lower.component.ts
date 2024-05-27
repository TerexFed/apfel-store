import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalWindowComponent } from '../../UI/modal-window/modal-window.component';

@Component({
  selector: 'modal-price-lower',
  templateUrl: './price-lower.component.html',
  styleUrl: './price-lower.component.scss'
})
export class PriceLowerComponent {
  constructor(public dialog: MatDialog) { }

  openDialogSend() {
    this.dialog.ngOnDestroy()
    this.dialog.open(ModalWindowComponent, { data: { type: 'ApplicationSend' } })
  }
}
