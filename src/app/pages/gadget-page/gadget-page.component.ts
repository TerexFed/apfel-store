import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GadgetService } from '../../services/gadget.service';
import { ModalWindowComponent } from '../../UI/modal-window/modal-window.component';
import { MatDialog } from '@angular/material/dialog';
import { BasketService } from '../../services/basket.service';
import { Location } from '@angular/common';
import { ProductPageFiltersService } from '../../services/product-page-filters.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../types/product';
import { WatchedGadgetsService } from '../../services/watched-gadgets.service';

@Component({
  selector: 'app-gadget-page',
  templateUrl: './gadget-page.component.html',
  styleUrl: './gadget-page.component.scss'
})
export class GadgetPageComponent {
  product: Product

  constructor(private route: ActivatedRoute, private router: Router, public gadgetService: GadgetService, private basketService: BasketService, public dialog: MatDialog, private location: Location, public productService: ProductService, public productFilters: ProductPageFiltersService, private watchedGadgetsService: WatchedGadgetsService) {
    (async () => {
      if (this.route.snapshot.params.id <= (await productService.getAllProducts()).length) {
        const productContent = await productService.getProductById(this.route.snapshot.params.id)
        if (!productContent) {
          this.router.navigate(['/'])
          return;
        }
        this.product = productContent
        this.productFilters.getMemoryCapacity(productContent, productContent.category)
        this.productFilters.getOtherGadgets(productContent, productContent.category)

        this.watchedGadgetsService.watch(productContent)
        this.gadgetService.getGadgetByID(productContent.id.toString())

      }
      else {
        this.router.navigate(['/'])
      }
    })()
  }
  public currentPic: string = ''

  public navigateToOtherGadgets(id: number) {
    this.router.navigate([`gadget/${id}`])
    this.gadgetService.getGadgetByID(`${id}`)
  }

  public changeMemoryCapacity(memory: string) {
    this.productFilters.updateMemoryCapacity(this.gadgetService.gadget, this.gadgetService.gadget.category, memory);
    for (let i = 0; i < this.productFilters.otherGadgets.length; i++) {
      if (this.productFilters.otherGadgets[i].color === this.gadgetService.gadget.color) {
        this.navigateToOtherGadgets(this.productFilters.otherGadgets[i].id)
      }
    }
  }

  public back() {
    this.router.navigate(['/all-catalog'])
    this.productFilters.clearFilters()
  }

  openModalOneClick() {
    window.scrollTo(0, 0)
    this.dialog.open(ModalWindowComponent, {
      data: {
        type: 'OneClick', title: this.gadgetService.gadget?.category === 'Смартфоны' || this.gadgetService.gadget?.category
          ===
          'Компьютеры' || this.gadgetService.gadget?.category === 'Планшеты'
          ?
          this.gadgetService.gadget?.name + ' '
          +
          this.gadgetService.gadget?.characteristics[1].value
          + ' ' + this.gadgetService.gadget?.characteristics[1].unit_type + ' ' + this.gadgetService.gadget?.color
          :
          this.gadgetService.gadget?.category === 'Гаджеты' || this.gadgetService.gadget?.category === 'Аксессуары' ?
            this.gadgetService.gadget?.name : this.gadgetService.gadget?.category === 'Часы' ? this.gadgetService.gadget?.name + ' '
              +
              this.gadgetService.gadget?.color : '', image: 'https://angular-final-project-backend.onrender.com/' + this.gadgetService.gadget.images[0], price: this.gadgetService.gadget.price, discountPrice: this.gadgetService.gadget.discount_price
      }
    })
  }

  openModalBasketAdd() {
    window.scrollTo(0, 0)
    this.basketService.addToBasket({ id: this.gadgetService.gadget.id, title: this.gadgetService.gadget.name, image: 'https://angular-final-project-backend.onrender.com/' + this.gadgetService.gadget.images[0], price: this.gadgetService.gadget.price, discountPrice: this.gadgetService.gadget.discount_price, count: 1, isInCart: true })
    this.dialog.open(ModalWindowComponent, {
      data: {
        type: 'BasketAdd', title: this.gadgetService.gadget?.category === 'Смартфоны' || this.gadgetService.gadget?.category
          ===
          'Компьютеры' || this.gadgetService.gadget?.category === 'Планшеты'
          ?
          this.gadgetService.gadget?.name + ' '
          +
          this.gadgetService.gadget?.characteristics[1].value
          + ' ' + this.gadgetService.gadget?.characteristics[1].unit_type + ' ' + this.gadgetService.gadget?.color
          :
          this.gadgetService.gadget?.category === 'Гаджеты' || this.gadgetService.gadget?.category === 'Аксессуары' ?
            this.gadgetService.gadget?.name : this.gadgetService.gadget?.category === 'Часы' ? this.gadgetService.gadget?.name + ' '
              +
              this.gadgetService.gadget?.color : '', image: 'https://angular-final-project-backend.onrender.com/' + this.gadgetService.gadget.images[0]
      }
    })
  }

  openModalCredit() {
    window.scrollTo(0, 0)
    this.dialog.open(ModalWindowComponent, {
      data: {
        type: 'Credit', title: this.gadgetService.gadget?.category === 'Смартфоны' || this.gadgetService.gadget?.category
          ===
          'Компьютеры' || this.gadgetService.gadget?.category === 'Планшеты'
          ?
          this.gadgetService.gadget?.name + ' '
          +
          this.gadgetService.gadget?.characteristics[1].value
          + ' ' + this.gadgetService.gadget?.characteristics[1].unit_type + ' ' + this.gadgetService.gadget?.color
          :
          this.gadgetService.gadget?.category === 'Гаджеты' || this.gadgetService.gadget?.category === 'Аксессуары' ?
            this.gadgetService.gadget?.name : this.gadgetService.gadget?.category === 'Часы' ? this.gadgetService.gadget?.name + ' '
              +
              this.gadgetService.gadget?.color : '', image: 'https://angular-final-project-backend.onrender.com/' + this.gadgetService.gadget.images[0], price: this.gadgetService.gadget.price, discountPrice: this.gadgetService.gadget.discount_price
      }
    })
  }

  openModalAdmission() {
    window.scrollTo(0, 0)
    this.dialog.open(ModalWindowComponent, {
      data: {
        type: 'Admission', title: this.gadgetService.gadget?.category === 'Смартфоны' || this.gadgetService.gadget?.category
          ===
          'Компьютеры' || this.gadgetService.gadget?.category === 'Планшеты'
          ?
          this.gadgetService.gadget?.name + ' '
          +
          this.gadgetService.gadget?.characteristics[1].value
          + ' ' + this.gadgetService.gadget?.characteristics[1].unit_type + ' ' + this.gadgetService.gadget?.color
          :
          this.gadgetService.gadget?.category === 'Гаджеты' || this.gadgetService.gadget?.category === 'Аксессуары' ?
            this.gadgetService.gadget?.name : this.gadgetService.gadget?.category === 'Часы' ? this.gadgetService.gadget?.name + ' '
              +
              this.gadgetService.gadget?.color : '', image: 'https://angular-final-project-backend.onrender.com/' + this.gadgetService.gadget.images[0]
      }
    })
  }
}
