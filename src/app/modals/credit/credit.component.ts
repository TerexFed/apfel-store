import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'modal-credit',
  templateUrl: './credit.component.html',
  styleUrl: './credit.component.scss'
})
export class CreditComponent implements OnInit {
  @Input() title: string = ''
  @Input() image: string = ''
  @Input() price: string = ''
  @Input() discountPrice: string = ''

  public creditLength: number = 2
  public creditOwe: string = 'Да'
  public age: number
  public telephone: string

  public monthPayment: number

  ngOnInit(): void {
    this.monthPayment = Math.round(+this.price / this.creditLength)
  }

  setMonthPayment() {
    this.monthPayment = Math.round(+this.price / this.creditLength)
  }
}
