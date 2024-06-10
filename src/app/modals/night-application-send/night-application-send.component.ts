import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'modal-night-application-send',
  templateUrl: './night-application-send.component.html',
  styleUrl: './night-application-send.component.scss'
})
export class NightApplicationSendComponent {
  constructor(public dialog: MatDialog) { }

  closeAll() {
    this.dialog.closeAll();
  }
}
