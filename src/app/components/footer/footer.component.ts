import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalWindowComponent } from '../../UI/modal-window/modal-window.component';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(public dialog: MatDialog, public router: Router, private productService: ProductService) { }

  public navigateToCategory(id: number) {
    window.scroll(0, 0)
    this.router.navigate([`/category/${id}`])
  }

  public scroll() {
    window.scroll(0, 0)
  }

  public navigateToDiscounts() {
    this.router.navigate(['/discount'])
  }


  public openModalCallBack() {
    window.scrollTo(0, 0)
    this.dialog.open(ModalWindowComponent, { data: { type: 'CallBack' } })
  }
}
