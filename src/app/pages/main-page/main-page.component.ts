import { Component } from '@angular/core';
import { FiltersService } from '../../services/filters.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  popularProductList: any[] = []
  newestProdcts: any[] = []

  constructor(fitersService: FiltersService) {
    (async () => {
      this.popularProductList = await fitersService.getPopularProducts()
      this.newestProdcts = await fitersService.getNewestProducts()
    })()
  }
}
