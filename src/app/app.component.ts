import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from './UI/bottom-sheet/bottom-sheet.component';
import { BottomSheetService } from './services/bottom-sheet.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private bottomSheet: MatBottomSheet, public bottomSheetService: BottomSheetService) { }

  openBottomSheet(type: string): void {
    this.bottomSheet.open(BottomSheetComponent, { data: { type: type } });
    if (type === 'basket') {
      this.bottomSheetService.openBasket();
    } else if (type === 'catalog') {
      this.bottomSheetService.openCatalog();
    }
  }

  closeBottomSheet(): void {
    this.bottomSheet.dismiss();
    this.bottomSheetService.closeBottomSheet();
  }
}
