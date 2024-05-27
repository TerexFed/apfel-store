import { Component, HostListener, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalWindowComponent } from '../../UI/modal-window/modal-window.component';
import { AdmissionComponent } from '../../modals/admission/admission.component';


@Component({
  selector: 'app-gadget-item',
  templateUrl: './gadget-item.component.html',
  styleUrl: './gadget-item.component.scss'
})
export class GadgetItemComponent implements OnInit {
  constructor(public dialog: MatDialog) { }
  @Input() gadget: any

  get5RatingArr() {
    return new Array(5).fill(true)
  }

  windowWidth: number = 1440

  ngOnInit(): void {
    this.windowWidth = globalThis.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;
  }

  openDialogAdmission() {
    window.scrollTo(0,0)
    this.dialog.open(ModalWindowComponent, { data: { type: 'Admission', title: this.gadget.name } })
  }
  openDialogOneClick() {
    window.scrollTo(0,0)
    this.dialog.open(ModalWindowComponent, { data: { type: 'OneClick' } })
  }
}
