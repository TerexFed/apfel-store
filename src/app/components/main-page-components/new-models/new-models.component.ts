import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'new-models',
  templateUrl: './new-models.component.html',
  styleUrl: './new-models.component.scss'
})
export class NewModelsComponent {
  constructor(private router: Router) { }

  public navigateToIphone() {
    window.scroll(0, 0)
    this.router.navigate([`/category/${2}/${19}`])
  }
}