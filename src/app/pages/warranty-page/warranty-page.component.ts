import { Component } from '@angular/core';

@Component({
  selector: 'app-warranty-page',
  templateUrl: './warranty-page.component.html',
  styleUrl: './warranty-page.component.scss'
})
export class WarrantyPageComponent {
  expandedIndex = 0;

  public scrollToTop() {
    window.scroll(0, 0)
  }
}
