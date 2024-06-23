import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { WatchedGadgetsService } from '../../services/watched-gadgets.service';
import { GadgetService } from '../../services/gadget.service';
@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrl: './review-page.component.scss',
})
export class ReviewPageComponent implements OnInit {
  popularProducts: any[] = [];
  public reviews = [
    {
      name: 'Эдуард',
      model: 'Отзыв об iPhone 14 Pro Max 256GB',
      text: 'Понравилось всё. Ребята в магазине работают шустро, за пару минутоформили, и уже через 3 часа телефон был у меня на руках. При получении курьер помог проверить телефон, и поклеить защитное стекло, так же покупал акционный набор аксессуаров, и их качество, как и оказалось на высоте. Всё работает, всё быстро и доступно, 5/5.',
    },
    {
      name: 'Эдуард',
      model: 'Отзыв об iPhone 14 Pro Max 256GB',
      text: 'Понравилось всё. Ребята в магазине работают шустро, за пару минутоформили, и уже через 3 часа телефон был у меня на руках. При получении курьер помог проверить телефон, и поклеить защитное стекло, так же покупал акционный набор аксессуаров, и их качество, как и оказалось на высоте. Всё работает, всё быстро и доступно, 5/5.',
    },
    {
      name: 'Эдуард',
      model: 'Отзыв об iPhone 14 Pro Max 256GB',
      text: 'Понравилось всё. Ребята в магазине работают шустро, за пару минутоформили, и уже через 3 часа телефон был у меня на руках. При получении курьер помог проверить телефон, и поклеить защитное стекло, так же покупал акционный набор аксессуаров, и их качество, как и оказалось на высоте. Всё работает, всё быстро и доступно, 5/5.',
    },
    {
      name: 'Эдуард',
      model: 'Отзыв об iPhone 14 Pro Max 256GB',
      text: 'Понравилось всё. Ребята в магазине работают шустро, за пару минутоформили, и уже через 3 часа телефон был у меня на руках. При получении курьер помог проверить телефон, и поклеить защитное стекло, так же покупал акционный набор аксессуаров, и их качество, как и оказалось на высоте. Всё работает, всё быстро и доступно, 5/5.',
    },
  ];

  constructor(private productService: ProductService, private router: Router, private watchedGadgetsService: WatchedGadgetsService, private gadgetService: GadgetService) {
    (async () => {
      const popularProductsContent =
        await this.productService.getPopularProducts();

      if (!popularProductsContent) {
        this.router.navigate(['/']);
        return;
      }
      this.popularProducts = popularProductsContent;
    })();
  }

  ngOnInit(): void {
    console.log(this.popularProducts);
  }

  public currentId: number = 0;
  public maxItems: number = 12;

  public scrollRight() {
    this.currentId = (this.currentId + 1) % this.maxItems;
  }

  public scrollLeft() {
    this.currentId = (this.currentId - 1 + this.maxItems) % this.maxItems;
  }


  public openGadget(product: any) {
    console.log(product)
    this.watchedGadgetsService.watch(product)
    this.router.navigate([`gadget/${product.id}`])
    this.gadgetService.getGadgetByID(product.id)
    window.scroll(0, 0)
  }


  public get5RatingArr() {
    return new Array(5).fill(true);
  }
}
