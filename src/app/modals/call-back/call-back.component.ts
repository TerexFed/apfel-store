import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalWindowComponent } from '../../UI/modal-window/modal-window.component';

@Component({
  selector: 'modal-callback',
  templateUrl: './call-back.component.html',
  styleUrl: './call-back.component.scss'
})
export class CallBackComponent {
  constructor(public dialog: MatDialog) { }

  public openApplicaitonSend(){
    this.dialog.ngOnDestroy()
    this.dialog.open(ModalWindowComponent, {data: {type: 'ApplicationSend'}})
  }
}
