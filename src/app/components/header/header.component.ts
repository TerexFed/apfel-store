import { Component, TemplateRef } from '@angular/core';
import { ModalWindowService } from '../../services/modal-window.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(public modalService: ModalWindowService) { }

  public isHeaderOpen = false
  public openHeader() {
    this.isHeaderOpen = !this.isHeaderOpen
  }
  public openModal(modalTemplate: TemplateRef<any>) {
    this.modalService.open(modalTemplate)
  }
}
