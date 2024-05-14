import { Component, TemplateRef } from '@angular/core';
import { ModalWindowService } from '../../services/modal-window.service';

@Component({
  selector: 'modal-callback',
  templateUrl: './call-back.component.html',
  styleUrl: './call-back.component.scss'
})
export class CallBackComponent {
  constructor(public modalService: ModalWindowService) { }

  public openModal(modalTemplate: TemplateRef<any>) {
    this.modalService.open(modalTemplate)
  }
}
