import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'modal-basket-add',
  templateUrl: './basket-add.component.html',
  styleUrl: './basket-add.component.scss'
})
export class BasketAddComponent implements OnInit {
  constructor(public dialog: MatDialog) { }
  @Input() title: string = ''
  @Input() image: string = ''

  ngOnInit(): void {
    console.log(this.image)
  }
  public closeModal(){
    this.dialog.ngOnDestroy()
  }
}
