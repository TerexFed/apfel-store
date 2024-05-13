import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ScrollGoodsComponent } from './components/scroll-goods/scroll-goods.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { WarrantyPageComponent } from './pages/warranty-page/warranty-page.component';
import { RefundPageComponent } from './pages/refund-page/refund-page.component';
import { CreditPageComponent } from './pages/credit-page/credit-page.component';
import { DeliveryPageComponent } from './pages/delivery-page/delivery-page.component';
import { ReviewPageComponent } from './pages/review-page/review-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { FavouritesPageComponent } from './pages/favourites-page/favourites-page.component';
import { AllCatalogPageComponent } from './pages/all-catalog-page/all-catalog-page.component';
import { BenefitsComponent } from './components/benefits/benefits.component';
import { DistributionComponent } from './components/distribution/distribution.component';
import { ModalWindowComponent } from './UI/modal-window/modal-window.component';
import { BasketComponent } from './modals/basket/basket.component';
//
import { CallBackComponent } from './modals/call-back/call-back.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainPageComponent,
    ScrollGoodsComponent,
    NotFoundPageComponent,
    FooterComponent,
    WarrantyPageComponent,
    RefundPageComponent,
    CreditPageComponent,
    DeliveryPageComponent,
    ReviewPageComponent,
    ContactPageComponent,
    FavouritesPageComponent,
    AllCatalogPageComponent,
    BenefitsComponent,
    DistributionComponent,
    ModalWindowComponent,
    BasketComponent,
    CallBackComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
