import { Component } from '@angular/core';

@Component({
  selector: 'benefits',
  templateUrl: './benefits.component.html',
  styleUrl: './benefits.component.scss'
})
export class BenefitsComponent {
  public scrollToTop() {
    window.scroll(0, 0)
  }
}
