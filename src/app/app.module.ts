import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageConnexionComponent } from './pourLes3Roles/page-connexion/page-connexion.component';
import { PageRegisterComponent } from './pourLes3Roles/register/page-register/page-register.component';
import { NavBarComponent } from './utils/components/nav-bar/nav-bar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormsModule} from "@angular/forms";
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
        MatGridListModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
