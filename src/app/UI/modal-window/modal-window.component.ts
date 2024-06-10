import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'modal-window',
  templateUrl: './modal-window.component.html',
  styleUrl: './modal-window.component.scss'
})
export class ModalWindowComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  get isAfter9PM(): boolean {
    const currentTime = new Date();
    return currentTime.getHours() >= 21; 
  }
}
