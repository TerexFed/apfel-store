import { Component } from '@angular/core';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrl: './review-page.component.scss',
})
export class ReviewPageComponent {
  public reviews = [
    {
      name: 'Эдуард',
      stars: '5',
      model: 'Отзыв об iPhone 14 Pro Max 256GB',
      text: 'Понравилось всё. Ребята в магазине работают шустро, за пару минутоформили, и уже через 3 часа телефон был у меня на руках. При получении курьер помог проверить телефон, и поклеить защитное стекло, так же покупал акционный набор аксессуаров, и их качество, как и оказалось на высоте. Всё работает, всё быстро и доступно, 5/5.',
    },
  ];
}
