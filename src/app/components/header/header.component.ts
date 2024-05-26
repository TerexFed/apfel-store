import { Component, TemplateRef } from '@angular/core';
import { ModalWindowComponent } from '../../UI/modal-window/modal-window.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(public dialog: MatDialog) { }

  public isHeaderOpen = false
  public openHeader() {
    this.isHeaderOpen = !this.isHeaderOpen
  }

  openModalBasket() {
    window.scrollTo(0, 0)
    this.dialog.open(ModalWindowComponent, { data: { type: 'Basket'} })
  }

  openModalCallback() {
    window.scrollTo(0, 0)
    this.dialog.open(ModalWindowComponent, { data: { type: 'CallBack'} })
  }
}
