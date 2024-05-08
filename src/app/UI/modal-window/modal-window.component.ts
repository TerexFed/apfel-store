import { Component, ElementRef, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'modal-window',
  templateUrl: './modal-window.component.html',
  styleUrl: './modal-window.component.scss'
})
export class ModalWindowComponent {
  @Output() closeEvent = new EventEmitter();

  constructor(private elementRef: ElementRef) { }

  close(): void {
    this.elementRef.nativeElement.remove();
    this.closeEvent.emit();
  }
}
