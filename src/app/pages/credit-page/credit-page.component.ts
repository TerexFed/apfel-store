import { Component } from '@angular/core';

@Component({
  selector: 'app-credit-page',
  templateUrl: './credit-page.component.html',
  styleUrl: './credit-page.component.scss'
})
export class CreditPageComponent {
  public scrollToTop() {
    window.scroll(0, 0)
  }
}
