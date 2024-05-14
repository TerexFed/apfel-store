import { Component, TemplateRef } from '@angular/core';
import { ModalWindowService } from '../../services/modal-window.service';

@Component({
  selector: 'application-send',
  templateUrl: './application-send.component.html',
  styleUrl: './application-send.component.scss'
})
export class ApplicationSendComponent {
  constructor(public modalService: ModalWindowService) { }
}
