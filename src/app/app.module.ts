import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { CdkAccordionModule } from '@angular/cdk/accordion';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ScrollGoodsComponent } from './components/main-page-components/scroll-goods/scroll-goods.component';
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
import { GadgetItemComponent } from './components/gadget-item/gadget-item.component';
import { CustomCurrencyPipe } from './pipes/custom-currency/custom-currency.component';
import { GadgetListComponent } from './components/gadget-list/gadget-list.component';
import { BasketComponent as ModalBasketComponent } from './modals/basket/basket.component';
import { CallBackComponent as ModalCallbackComponent } from './modals/call-back/call-back.component';
import { ApplicationSendComponent } from './modals/application-send/application-send.component';
import { PriceLowerComponent } from './modals/price-lower/price-lower.component';
import { AdmissionComponent } from './modals/admission/admission.component';
import { ModalWindowComponent } from './UI/modal-window/modal-window.component';
import { BenefitsComponent } from './components/main-page-components/benefits/benefits.component';
import { DistributionComponent } from './components/main-page-components/distribution/distribution.component';
import { NewModelsComponent } from './components/main-page-components/new-models/new-models.component';
import { OneClickComponent } from './modals/one-click/one-click.component';
import { BasketSuccessComponent } from './modals/basket-success/basket-success.component';
import { BasketAddComponent } from './modals/basket-add/basket-add.component';
import { GadgetPageComponent } from './pages/gadget-page/gadget-page.component';
import { CreditComponent } from './modals/credit/credit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WatchedGadgetsComponent } from './components/watched-gadgets/watched-gadgets.component';
import { TradeInComponent } from './modals/trade-in/trade-in.component';
import { NightApplicationSendComponent } from './modals/night-application-send/night-application-send.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { BottomSheetComponent } from './UI/bottom-sheet/bottom-sheet.component';
import { provideAnimations } from '@angular/platform-browser/animations';
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
    GadgetItemComponent,
    CustomCurrencyPipe,
    GadgetListComponent,
    ModalBasketComponent,
    ModalCallbackComponent,
    ApplicationSendComponent,
    PriceLowerComponent,
    AdmissionComponent,
    ModalWindowComponent,
    NewModelsComponent,
    OneClickComponent,
    BasketSuccessComponent,
    BasketAddComponent,
    GadgetPageComponent,
    CreditComponent,
    WatchedGadgetsComponent,
    TradeInComponent,
    NightApplicationSendComponent,
    BottomSheetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    CdkAccordionModule,
    MatSliderModule,
    MatListModule,
    MatBottomSheetModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimations()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
