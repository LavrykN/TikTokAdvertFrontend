import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainLoyoutComponent} from './shared/components/main-loyout/main-loyout.component';
import {HomePageComponent} from './home-page/home-page.component';
import {HeaderComponent} from './shared/components/header/header.component';
import {FooterComponent} from './shared/components/footer/footer.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AddAccountComponent} from './add-account/add-account.component';
import {HelpMeComponent} from './help-me/help-me.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NgSelectModule} from "@ng-select/ng-select";
import {registerLocaleData} from "@angular/common";
import plLocale from "@angular/common/locales/ru";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {Ng5SliderModule} from "ng5-slider";
import { ModalComponent } from './modal/modal.component';



registerLocaleData(plLocale, 'ru')

@NgModule({
  declarations: [
    AppComponent,
    MainLoyoutComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    AddAccountComponent,
    HelpMeComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    InfiniteScrollModule,
    Ng5SliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
