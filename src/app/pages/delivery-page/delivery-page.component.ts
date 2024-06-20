import { Component } from '@angular/core';

@Component({
  selector: 'app-delivery-page',
  templateUrl: './delivery-page.component.html',
  styleUrl: './delivery-page.component.scss'
})
export class DeliveryPageComponent {
  public scrollToTop() {
    window.scroll(0, 0)
  }
}
