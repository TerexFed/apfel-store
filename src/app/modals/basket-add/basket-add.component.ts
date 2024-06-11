import { Component, HostListener, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalWindowComponent } from '../../UI/modal-window/modal-window.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../../UI/bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'modal-basket-add',
  templateUrl: './basket-add.component.html',
  styleUrl: './basket-add.component.scss'
})
export class BasketAddComponent implements OnInit {
  constructor(public dialog: MatDialog, private bottomSheet: MatBottomSheet) { }
  @Input() title: string = ''
  @Input() image: string = ''

  windowWidth: number = 1440

  ngOnInit(): void {
    this.windowWidth = globalThis.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.windowWidth = event.target.innerWidth;
  }

  public closeModal() {
    this.dialog.ngOnDestroy()
  }

  public openBasketModal() {
    this.dialog.ngOnDestroy()
    this.dialog.open(ModalWindowComponent, { data: { type: 'Basket' } })
  }

  public openBasket() {
    if (this.windowWidth <= 1440) {
      this.dialog.ngOnDestroy()
      this.bottomSheet.open(BottomSheetComponent, { data: { type: 'basket' }, backdropClass: 'backdropBack' });
    }
    else {
      this.openBasketModal()
    }
  }
}
