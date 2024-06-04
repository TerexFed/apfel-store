import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'modal-basket-success',
  templateUrl: './basket-success.component.html',
  styleUrl: './basket-success.component.scss'
})
export class BasketSuccessComponent {
  constructor(public dialog: MatDialog) { }

  public closeModals(){
    this.dialog.closeAll()
  }
}
