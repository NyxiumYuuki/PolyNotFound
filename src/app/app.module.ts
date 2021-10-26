import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageConnexionComponent } from './pourLes3Roles/page-connexion/page-connexion.component';
import { PageRegisterComponent } from './pourLes3Roles/register/page-register/page-register.component';
import { NavBarComponent } from './utils/nav-bar/nav-bar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormsModule} from "@angular/forms";
import { PageSearchComponent } from './user/page-search/page-search.component';
import {HttpClientModule} from "@angular/common/http";
import { PopupConfirmationComponent } from './pourLes3Roles/register/popup-confirmation/popup-confirmation.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    AppComponent,
    PageConnexionComponent,
    PageRegisterComponent,
    NavBarComponent,
    PageSearchComponent,
    PopupConfirmationComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSlideToggleModule,
        FormsModule,
        HttpClientModule,
        MatDialogModule,
        MatButtonModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
