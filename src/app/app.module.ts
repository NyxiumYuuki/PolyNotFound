import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageConnexionComponent } from './pourLes3Roles/page-connexion/page-connexion.component';
import { PageRegisterComponent } from './pourLes3Roles/register/page-register/page-register.component';
import { NavBarComponent } from './utils/components/nav-bar/nav-bar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PageSearchComponent } from './user/search/page-search/page-search.component';
import {HttpClientModule} from "@angular/common/http";
import { PopupConfirmationComponent } from './pourLes3Roles/register/popup-confirmation/popup-confirmation.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from "@angular/material/button";
import { AdvertComponent } from './utils/components/advert/advert.component';
import { VideoCellComponent } from './user/search/video-cell/video-cell.component';
import { VideoGridComponent } from './user/search/video-grid/video-grid.component';
import {MatIconModule} from "@angular/material/icon";
import { PopupAddVideoToPlaylistsComponent } from './utils/components/popup-add-video-to-playlists/popup-add-video-to-playlists.component';
import {MatInputModule} from "@angular/material/input";
import {MatDividerModule} from "@angular/material/divider";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { IframeTrackerDirective } from './utils/directives/iframe-tracker/iframe-tracker.directive';
import {MatGridListModule} from "@angular/material/grid-list";
import { PageMyPlaylistsComponent } from './user/myPlaylists/page-my-playlists/page-my-playlists.component';
import { PlaylistListComponent } from './user/myPlaylists/playlist-list/playlist-list.component';
import {VideoListComponent} from "./user/myPlaylists/video-list/video-list.component";
import { PopupCreatePlaylistComponent } from './utils/components/popup-create-playlist/popup-create-playlist.component';
import { PageHistoryUserComponent } from './user/history/page-history-user/page-history-user.component';
import {MatTableModule} from '@angular/material/table';
import { PageMyProfilComponent } from './utils/components/myProfil/page-my-profil/page-my-profil.component';
import { PopupPictureProfilUrlComponent } from './utils/components/myProfil/popup-picture-profil-url/popup-picture-profil-url.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatSortModule} from "@angular/material/sort";
import { PageAdvertiserComponent } from './advertiser/page-advertiser/page-advertiser.component';
import { PopupDeleteAdComponent } from './advertiser/popup-delete-ad/popup-delete-ad.component';
import { PopupAddOrUpdateAdComponent } from './advertiser/popup-add-or-update-ad/popup-add-or-update-ad.component';
import { PopupVisualizeAdComponent } from './advertiser/popup-visualize-ad/popup-visualize-ad.component';
import { BarTagsComponent } from './advertiser/bar-tags/bar-tags.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSelectModule} from "@angular/material/select";
import { PopupVisualizeImagesComponent } from './advertiser/popup-visualize-images/popup-visualize-images.component';
import {IvyCarouselModule} from "angular-responsive-carousel";
import { DragAndDropComponent } from './advertiser/drag-and-drop/drag-and-drop.component';
import { DragAndDropDirective } from './utils/directives/dragAndDrop/drag-and-drop.directive';


@NgModule({
    declarations: [
        AppComponent,
        PageConnexionComponent,
        PageRegisterComponent,
        NavBarComponent,
        PageSearchComponent,
        PopupConfirmationComponent,
        AdvertComponent,
        VideoCellComponent,
        VideoGridComponent,
        PopupAddVideoToPlaylistsComponent,
        IframeTrackerDirective,
        PageMyPlaylistsComponent,
        VideoListComponent,
        PlaylistListComponent,
        VideoListComponent,
        PopupCreatePlaylistComponent,
        PageHistoryUserComponent,
        PageMyProfilComponent,
        PopupPictureProfilUrlComponent,
        PageAdvertiserComponent,
        PopupDeleteAdComponent,
        PopupAddOrUpdateAdComponent,
        PopupVisualizeAdComponent,
        BarTagsComponent,
        PopupVisualizeImagesComponent,
        DragAndDropComponent,
        DragAndDropDirective,
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
        IvyCarouselModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
