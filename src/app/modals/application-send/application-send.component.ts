import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'modal-application-send',
  templateUrl: './application-send.component.html',
  styleUrl: './application-send.component.scss'
})
export class ApplicationSendComponent {
  constructor(public dialog: MatDialog) { }

  closeAll(){
    this.dialog.closeAll();
  }
}
