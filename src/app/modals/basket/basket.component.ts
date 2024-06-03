import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'modal-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent {
  constructor(public router: Router, public basketService: BasketService) { }
}
