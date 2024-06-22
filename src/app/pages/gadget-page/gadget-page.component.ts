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

  public async changeMemoryCapacity(memory: string) {
    await this.productFilters.updateMemoryCapacity(this.product, this.product.category, memory);

    this.productFilters.otherGadgets.forEach(gadget => {
      if (gadget.color === this.product.color) {
        this.navigateToOtherGadgets(gadget.id);
      }
    });
  }

  public back() {
    let previousUrl: string = ''
    switch (this.product?.category) {
      case 'Смартфоны': previousUrl = '2';
        break

      case 'Планшеты': previousUrl = '4';
        break

      case 'Компьютеры': previousUrl = '3';
        break

      case 'Часы': previousUrl = '5';
        break

      case 'Гаджеты': previousUrl = '6';
        break

      case 'Аксессуары': previousUrl = '1';
        break

      default: previousUrl = ''
    }
    this.router.navigateByUrl(`category/${previousUrl}`);
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
