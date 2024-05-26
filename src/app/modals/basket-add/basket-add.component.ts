import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'modal-basket-add',
  templateUrl: './basket-add.component.html',
  styleUrl: './basket-add.component.scss'
})
export class BasketAddComponent {
  constructor(public dialog: MatDialog) { }
  @Input() title: string = ''

  public closeModal(){
    this.dialog.ngOnDestroy()
  }
}
