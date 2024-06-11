import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from './UI/bottom-sheet/bottom-sheet.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private bottomSheet: MatBottomSheet) { }

  isCatalogOpen: boolean = false
  isBasketOpen: boolean = false

  public closeBottomSheet(type: string) {
    if (type === 'catalog') {
      this.isCatalogOpen = false;
    } else if (type === 'basket') {
      this.isBasketOpen = false;
    }
    this.bottomSheet.dismiss();
  }

  public openBottomSheet(type: string): void {
    this.bottomSheet.open(BottomSheetComponent, { data: { type: type, close: this.closeBottomSheet.bind(this) }, backdropClass: 'backdropBack' });
    if (type === 'catalog') {
      this.isCatalogOpen = true;
      this.isBasketOpen = false;
    } else if (type === 'basket') {
      this.isBasketOpen = true;
      this.isCatalogOpen = false;
    }
  }


}
