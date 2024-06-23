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

  public closeBottomSheet(): void {
    this.bottomSheet.dismiss();
    this.bottomSheetService.closeBottomSheet();
  }

  public openBottomSheet(type: string): void {
    this.bottomSheet.open(BottomSheetComponent, { data: { type: type, close: this.closeBottomSheet.bind(this) }, backdropClass: 'backdropBack' })
      .afterDismissed().subscribe(() => {
        if (type === 'basket') {
          this.bottomSheetService.closeBasket()
        }
        else if (type === 'catalog') {
          this.bottomSheetService.closeCatalog()
        }
      });
    if (type === 'basket') {
      this.bottomSheetService.openBasket();
    } else if (type === 'catalog') {
      this.bottomSheetService.openCatalog();
    }
  }

}
