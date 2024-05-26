import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalWindowComponent } from '../../UI/modal-window/modal-window.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(public dialog: MatDialog) { }

  openModalCallBack() {
    window.scrollTo(0, 0)
    this.dialog.open(ModalWindowComponent, { data: { type: 'CallBack'} })
  }
}
