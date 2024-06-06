import { Component, Input } from '@angular/core';
import { ModalWindowComponent } from '../../UI/modal-window/modal-window.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'modal-admission',
  templateUrl: './admission.component.html',
  styleUrl: './admission.component.scss'
})
export class AdmissionComponent {
  constructor(public dialog: MatDialog) { }

  @Input() title: string = ''
  @Input() image: string = ''

  public openApplicaitonSend(){
    this.dialog.ngOnDestroy()
    this.dialog.open(ModalWindowComponent, {data: {type: 'ApplicationSend'}})
  }
}
