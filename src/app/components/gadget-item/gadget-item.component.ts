import { Component, HostListener, Input, OnInit, TemplateRef } from '@angular/core';
import { ModalWindowService } from '../../services/modal-window.service';

@Component({
  selector: 'app-gadget-item',
  templateUrl: './gadget-item.component.html',
  styleUrl: './gadget-item.component.scss'
})
export class GadgetItemComponent implements OnInit {
  constructor(public modalService: ModalWindowService) { }
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


  public openModal(modalTemplate: TemplateRef<any>) {
    this.modalService.open(modalTemplate)
  }
}
