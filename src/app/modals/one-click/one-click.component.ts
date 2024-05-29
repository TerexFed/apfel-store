import { Component, Input } from '@angular/core';

@Component({
  selector: 'modal-one-click',
  templateUrl: './one-click.component.html',
  styleUrl: './one-click.component.scss'
})
export class OneClickComponent {
  @Input() title: string = ''
  @Input() image: string = ''
  @Input() price: string = ''
  @Input() discountPrice: string = ''
}
