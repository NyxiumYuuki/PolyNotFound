import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageLoginComponent } from './beforeConnexion/login/page-login/page-login.component';
import { PopupForgottenPasswordComponent } from './beforeConnexion/login/popup-forgotten-password/popup-forgotten-password.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatRadioModule} from "@angular/material/radio";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { PageRegisterComponent } from './beforeConnexion/register/page-register/page-register.component';
import { PopupConfirmationComponent } from './beforeConnexion/register/popup-confirmation/popup-confirmation.component';
import { InputInterestsRegisterComponent } from './beforeConnexion/register/input-interests-register/input-interests-register.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatStepperModule} from "@angular/material/stepper";
import { NavbarBeforeConnexionComponent } from './beforeConnexion/utils/navbar-before-connexion/navbar-before-connexion.component';
import { PageProfilAdminComponent } from './admin/myProfil/page-profil-admin/page-profil-admin.component';
import { PopupUpdateAdminComponent } from './admin/myProfil/popup-update-admin/popup-update-admin.component';
import { PageAdListAdminComponent } from './admin/adList/page-ad-list-admin/page-ad-list-admin.component';
import { PopupDeleteAdAdminComponent } from './admin/adList/popup-delete-ad-admin/popup-delete-ad-admin.component';
import { PopupVisualizeImagesAdminComponent } from './admin/adList/popup-visualize-images-admin/popup-visualize-images-admin.component';
import {MatDividerModule} from "@angular/material/divider";
import {MatSelectModule} from "@angular/material/select";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatGridListModule} from "@angular/material/grid-list";
import { PageUserListComponent } from './admin/userList/page-user-list/page-user-list.component';
import { InputInterestsAdminComponent } from './admin/userList/input-interests-admin/input-interests-admin.component';
import { PopupCreateUserComponent } from './admin/userList/popup-create-user/popup-create-user.component';
import { PopupDeleteUserComponent } from './admin/userList/popup-delete-user/popup-delete-user.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { NavbarAdminComponent } from './admin/utils/navbar-admin/navbar-admin.component';
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    AppComponent,
    PageLoginComponent,
    PopupForgottenPasswordComponent,
    PageRegisterComponent,
    PopupConfirmationComponent,
    InputInterestsRegisterComponent,
    NavbarBeforeConnexionComponent,
    PageProfilAdminComponent,
    PopupUpdateAdminComponent,
    PageAdListAdminComponent,
    PopupDeleteAdAdminComponent,
    PopupVisualizeImagesAdminComponent,
    PageUserListComponent,
    InputInterestsAdminComponent,
    PopupCreateUserComponent,
    PopupDeleteUserComponent,
    NavbarAdminComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatSortModule,
        MatRadioModule,
        FormsModule,
        HttpClientModule,
        MatDialogModule,
        MatButtonModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,
        MatChipsModule,
        MatIconModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatStepperModule,
        MatDividerModule,
        MatSelectModule,
        MatPaginatorModule,
        MatGridListModule,
        MatSlideToggleModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
