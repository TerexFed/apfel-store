import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'modal-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent {
  constructor(public router: Router) {}
}
