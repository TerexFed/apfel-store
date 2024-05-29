import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AllCatalogPageComponent } from './pages/all-catalog-page/all-catalog-page.component';
import { WarrantyPageComponent } from './pages/warranty-page/warranty-page.component';
import { RefundPageComponent } from './pages/refund-page/refund-page.component';
import { CreditPageComponent } from './pages/credit-page/credit-page.component';
import { DeliveryPageComponent } from './pages/delivery-page/delivery-page.component';
import { ReviewPageComponent } from './pages/review-page/review-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { FavouritesPageComponent } from './pages/favourites-page/favourites-page.component';
import { GadgetPageComponent } from './pages/gadget-page/gadget-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: 'all-catalog',
    component: AllCatalogPageComponent
  },
  {
    path: 'gadget/:id',
    component: GadgetPageComponent
  },
  {
    path: 'warranty',
    component: WarrantyPageComponent
  },
  {
    path: 'refund',
    component: RefundPageComponent
  },
  {
    path: 'credit',
    component: CreditPageComponent
  },
  {
    path: 'delivery',
    component: DeliveryPageComponent
  },
  {
    path: 'review',
    component: ReviewPageComponent
  },
  {
    path: 'contacts',
    component: ContactPageComponent
  },
  {
    path: 'favourites',
    component: FavouritesPageComponent
  },
  {
    path: '**',
    component: NotFoundPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
