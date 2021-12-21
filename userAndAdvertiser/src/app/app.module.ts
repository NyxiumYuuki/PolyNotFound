import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDividerModule} from "@angular/material/divider";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatChipsModule} from "@angular/material/chips";
import {MatSelectModule} from "@angular/material/select";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatRadioModule} from "@angular/material/radio";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { ChartsModule } from 'ng2-charts';
import {DragAndDropComponent} from "./advertiser/adList/drag-and-drop/drag-and-drop.component";
import {InputInterestsAdComponent} from "./advertiser/adList/input-interests-ad/input-interests-ad.component";
import {PageAdListAdvertiserComponent} from "./advertiser/adList/page-ad-list-advertiser/page-ad-list-advertiser.component";
import {PopupAddOrUpdateAdComponent} from "./advertiser/adList/popup-add-or-update-ad/popup-add-or-update-ad.component";
import {PopupDeleteAdAdvertiserComponent} from "./advertiser/adList/popup-delete-ad-advertiser/popup-delete-ad-advertiser.component";
import {PopupVisualizeAdAdvertiserComponent} from "./advertiser/adList/popup-visualize-ad-advertiser/popup-visualize-ad-advertiser.component";
import {PopupVisualizeImagesAdvertiserComponent} from "./advertiser/adList/popup-visualize-images-advertiser/popup-visualize-images-advertiser.component";
import {NavbarAdvertiserComponent} from "./advertiser/utils/navbar-advertiser/navbar-advertiser.component";
import {DragAndDropDirective} from "./advertiser/utils/dragAndDrop/drag-and-drop.directive";
import {PageProfilAdvertiserComponent} from "./advertiser/myProfil/page-profil-advertiser/page-profil-advertiser.component";
import {PopupUpdateAdvertiserComponent} from "./advertiser/myProfil/popup-update-advertiser/popup-update-advertiser.component";
import {PagesPopularityComponent} from "./advertiser/pages-popularity/pages-popularity.component";
import {NavbarUserComponent} from "./user/utils/components/navbar-user/navbar-user.component";
import {PageHistoryUserComponent} from "./user/history/page-history-user/page-history-user.component";
import {PageMyPlaylistsComponent} from "./user/myPlaylists/page-my-playlists/page-my-playlists.component";
import {PlaylistListComponent} from "./user/myPlaylists/playlist-list/playlist-list.component";
import {PopupCreateOrUpdatePlaylistComponent} from "./user/myPlaylists/popup-create-or-update-playlist/popup-create-or-update-playlist.component";
import {PopupDeletePlaylistComponent} from "./user/myPlaylists/popup-delete-playlist/popup-delete-playlist.component";
import {VideoListComponent} from "./user/myPlaylists/video-list/video-list.component";
import {InputInterestsProfilComponent} from "./user/myProfil/input-interests-profil/input-interests-profil.component";
import {PageProfilUserComponent} from "./user/myProfil/page-profil-user/page-profil-user.component";
import {PopupUpdateUserComponent} from "./user/myProfil/popup-update-user/popup-update-user.component";
import {PageSearchComponent} from "./user/search/page-search/page-search.component";
import {VideoGridComponent} from "./user/search/video-grid/video-grid.component";
import {PageWatchingVideoComponent} from "./user/watching/page-watching-video/page-watching-video.component";
import {AdvertComponent} from "./user/utils/components/advert/advert.component";
import {PopupAddVideoToPlaylistsComponent} from "./user/utils/components/popup-add-video-to-playlists/popup-add-video-to-playlists.component";
import {PageLoginComponent} from "./beforeConnexion/login/page-login/page-login.component";
import {PopupForgottenPasswordComponent} from "./beforeConnexion/login/popup-forgotten-password/popup-forgotten-password.component";
import {InputInterestsRegisterComponent} from "./beforeConnexion/register/input-interests-register/input-interests-register.component";
import {PageRegisterComponent} from "./beforeConnexion/register/page-register/page-register.component";
import {PopupConfirmationComponent} from "./beforeConnexion/register/popup-confirmation/popup-confirmation.component";
import {NavbarBeforeConnexionComponent} from "./beforeConnexion/utils/navbar-before-connexion/navbar-before-connexion.component";
import {MatStepperModule} from "@angular/material/stepper";

@NgModule({
  declarations: [
    AppComponent,
      DragAndDropDirective,
      NavbarBeforeConnexionComponent,
      PageLoginComponent,
      PopupForgottenPasswordComponent,
      InputInterestsRegisterComponent,
      PageRegisterComponent,
      PopupConfirmationComponent,
      NavbarAdvertiserComponent,
      DragAndDropComponent,
      InputInterestsAdComponent,
      PageAdListAdvertiserComponent,
      PopupAddOrUpdateAdComponent,
      PopupDeleteAdAdvertiserComponent,
      PopupVisualizeAdAdvertiserComponent,
      PopupVisualizeImagesAdvertiserComponent,
      PageProfilAdvertiserComponent,
      PopupUpdateAdvertiserComponent,
      PagesPopularityComponent,
      NavbarUserComponent,
      PageHistoryUserComponent,
      PageMyPlaylistsComponent,
      PlaylistListComponent,
      PopupCreateOrUpdatePlaylistComponent,
      PopupDeletePlaylistComponent,
      VideoListComponent,
      InputInterestsProfilComponent,
      PageProfilUserComponent,
      PopupUpdateUserComponent,
      PageSearchComponent,
      VideoGridComponent,
      PageWatchingVideoComponent,
      AdvertComponent,
      PopupAddVideoToPlaylistsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSlideToggleModule,
        FormsModule,
        HttpClientModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatDividerModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatSnackBarModule,
        MatGridListModule,
        MatTableModule,
        MatSortModule,
        MatChipsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatRadioModule,
        MatPaginatorModule,
        MatDatepickerModule,
        ChartsModule,
        MatStepperModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
