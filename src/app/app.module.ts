import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageLoginComponent } from './beforeConnexion/login/page-login/page-login.component';
import { PageRegisterComponent } from './beforeConnexion/register/page-register/page-register.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PageSearchComponent } from './user/search/page-search/page-search.component';
import {HttpClientModule} from "@angular/common/http";
import { PopupConfirmationComponent } from './beforeConnexion/register/popup-confirmation/popup-confirmation.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from "@angular/material/button";
import { AdvertComponent } from './user/utils/components/advert/advert.component';
import { VideoGridComponent } from './user/search/video-grid/video-grid.component';
import {MatIconModule} from "@angular/material/icon";
import { PopupAddVideoToPlaylistsComponent } from './user/utils/components/popup-add-video-to-playlists/popup-add-video-to-playlists.component';
import {MatInputModule} from "@angular/material/input";
import {MatDividerModule} from "@angular/material/divider";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatGridListModule} from "@angular/material/grid-list";
import { PageMyPlaylistsComponent } from './user/myPlaylists/page-my-playlists/page-my-playlists.component';
import { PlaylistListComponent } from './user/myPlaylists/playlist-list/playlist-list.component';
import {VideoListComponent} from "./user/myPlaylists/video-list/video-list.component";
import { PopupCreatePlaylistComponent } from './user/myPlaylists/popup-create-playlist/popup-create-playlist.component';
import { PageHistoryUserComponent } from './user/history/page-history-user/page-history-user.component';
import {MatTableModule} from '@angular/material/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatSortModule} from "@angular/material/sort";
import { PageAdListAdvertiserComponent } from './advertiser/adList/page-ad-list-advertiser/page-ad-list-advertiser.component';
import { PopupDeleteAdAdvertiserComponent } from './advertiser/adList/popup-delete-ad-advertiser/popup-delete-ad-advertiser.component';
import { PopupAddOrUpdateAdComponent } from './advertiser/adList/popup-add-or-update-ad/popup-add-or-update-ad.component';
import { PopupVisualizeAdAdvertiserComponent } from './advertiser/adList/popup-visualize-ad-advertiser/popup-visualize-ad-advertiser.component';
import { InputInterestsAdComponent } from './advertiser/adList/input-interests-ad/input-interests-ad.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSelectModule} from "@angular/material/select";
import { PopupVisualizeImagesAdvertiserComponent } from './advertiser/adList/popup-visualize-images-advertiser/popup-visualize-images-advertiser.component';
import {IvyCarouselModule} from "angular-responsive-carousel";
import { DragAndDropComponent } from './advertiser/adList/drag-and-drop/drag-and-drop.component';
import { DragAndDropDirective } from './advertiser/utils/dragAndDrop/drag-and-drop.directive';
import { PageProfilUserComponent } from './user/myProfil/page-profil-user/page-profil-user.component';
import { NavbarUserComponent } from './user/utils/components/navbar-user/navbar-user.component';
import { NavbarAdvertiserComponent } from './advertiser/utils/navbar-advertiser/navbar-advertiser.component';
import { NavbarAdminComponent } from './admin/utils/navbar-admin/navbar-admin.component';
import { PageProfilAdvertiserComponent } from './advertiser/myProfil/page-profil-advertiser/page-profil-advertiser.component';
import { PopupUpdateAdvertiserComponent } from './advertiser/myProfil/popup-update-advertiser/popup-update-advertiser.component';
import { PopupUpdateUserComponent } from './user/myProfil/popup-update-user/popup-update-user.component';
import { NavbarBeforeConnexionComponent } from './beforeConnexion/utils/navbar-before-connexion/navbar-before-connexion.component';
import {MatRadioModule} from "@angular/material/radio";
import { InputInterestsProfilComponent } from './user/myProfil/input-interests-profil/input-interests-profil.component';
import { PageProfilAdminComponent } from './admin/myProfil/page-profil-admin/page-profil-admin.component';
import { PopupUpdateAdminComponent } from './admin/myProfil/popup-update-admin/popup-update-admin.component';
import {MatStepperModule} from "@angular/material/stepper";
import { InputInterestsRegisterComponent } from './beforeConnexion/register/input-interests-register/input-interests-register.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import { PageAdListAdminComponent } from './admin/adList/page-ad-list-admin/page-ad-list-admin.component';
import { PopupDeleteAdAdminComponent } from './admin/adList/popup-delete-ad-admin/popup-delete-ad-admin.component';
import { PopupVisualizeImagesAdminComponent } from './admin/adList/popup-visualize-images-admin/popup-visualize-images-admin.component';
import { PageUserListComponent } from './admin/userList/page-user-list/page-user-list.component';
import { PopupDeleteUserComponent } from './admin/userList/popup-delete-user/popup-delete-user.component';
import { PopupCreateUserComponent } from './admin/userList/popup-create-user/popup-create-user.component';
import { InputInterestsAdminComponent } from './admin/userList/input-interests-admin/input-interests-admin.component';
import { PageWatchingVideoComponent } from './user/watching/page-watching-video/page-watching-video.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import { PagesPopularityComponent } from './advertiser/pages-popularity/pages-popularity.component';
import { ChartsModule } from 'ng2-charts';
import { PopupDeletePlaylistComponent } from './user/myPlaylists/popup-delete-playlist/popup-delete-playlist.component';
import { PopupForgottenPasswordComponent } from './beforeConnexion/login/popup-forgotten-password/popup-forgotten-password.component';


@NgModule({
    declarations: [
        AppComponent,
        PageLoginComponent,
        PageRegisterComponent,
        PageSearchComponent,
        PopupConfirmationComponent,
        AdvertComponent,
        VideoGridComponent,
        PopupAddVideoToPlaylistsComponent,
        PageMyPlaylistsComponent,
        VideoListComponent,
        PlaylistListComponent,
        VideoListComponent,
        PopupCreatePlaylistComponent,
        PageHistoryUserComponent,
        PageAdListAdvertiserComponent,
        PopupDeleteAdAdvertiserComponent,
        PopupAddOrUpdateAdComponent,
        PopupVisualizeAdAdvertiserComponent,
        InputInterestsAdComponent,
        PopupVisualizeImagesAdvertiserComponent,
        DragAndDropComponent,
        DragAndDropDirective,
        PageProfilUserComponent,
        NavbarUserComponent,
        NavbarAdvertiserComponent,
        NavbarAdminComponent,
        PageProfilAdvertiserComponent,
        PopupUpdateAdvertiserComponent,
        PopupUpdateUserComponent,
        NavbarBeforeConnexionComponent,
        InputInterestsProfilComponent,
        PageProfilAdminComponent,
        PopupUpdateAdminComponent,
        InputInterestsRegisterComponent,
        PageAdListAdminComponent,
        PopupDeleteAdAdminComponent,
        PopupVisualizeImagesAdminComponent,
        PageUserListComponent,
        PopupDeleteUserComponent,
        PopupCreateUserComponent,
        InputInterestsAdminComponent,
        PageWatchingVideoComponent,
        PagesPopularityComponent,
        PopupDeletePlaylistComponent,
        PopupForgottenPasswordComponent,
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
        NgbModule,
        MatSortModule,
        MatChipsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatSelectModule,
        IvyCarouselModule,
        MatRadioModule,
        MatStepperModule,
        MatPaginatorModule,
        MatDatepickerModule,
        ChartsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
