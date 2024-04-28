import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public isHeaderOpen = false
  public openHeader() {
    this.isHeaderOpen = !this.isHeaderOpen
  }
}
