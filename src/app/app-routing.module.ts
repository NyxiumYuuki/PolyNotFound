import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageLoginComponent} from './beforeConnexion/login/page-login/page-login.component';
import {PageRegisterComponent} from "./beforeConnexion/register/page-register/page-register.component";
import {PageSearchComponent} from "./user/search/page-search/page-search.component";
import {PageMyPlaylistsComponent} from "./user/myPlaylists/page-my-playlists/page-my-playlists.component";
import {PageHistoryUserComponent} from "./user/history/page-history-user/page-history-user.component";
import {PageAdListAdvertiserComponent} from "./advertiser/adList/page-ad-list-advertiser/page-ad-list-advertiser.component";
import {PageProfilUserComponent} from "./user/myProfil/page-profil-user/page-profil-user.component";
import {PageProfilAdvertiserComponent} from "./advertiser/myProfil/page-profil-advertiser/page-profil-advertiser.component";
import {PageProfilAdminComponent} from "./admin/myProfil/page-profil-admin/page-profil-admin.component";
import {PageAdListAdminComponent} from "./admin/adList/page-ad-list-admin/page-ad-list-admin.component";
import {PageUserListComponent} from "./admin/userList/page-user-list/page-user-list.component";
import {PageWatchingVideoComponent} from "./user/watching/page-watching-video/page-watching-video.component";
import {PagesPopularityComponent} from "./advertiser/pages-popularity/pages-popularity.component";


const routes: Routes = [

    // Before connexion
    { path: '', component: PageLoginComponent },
    { path: 'login', component: PageLoginComponent },
    { path: 'register', component: PageRegisterComponent },

    // User
    { path: 'user', component: PageSearchComponent },
    { path: 'user/search', component: PageSearchComponent },
    { path: 'user/myPlaylists', component: PageMyPlaylistsComponent },
    { path: 'user/history', component: PageHistoryUserComponent },
    { path: 'user/myProfil', component:  PageProfilUserComponent },
    { path: 'user/watching/fromSearch/:videoId/:source/:search', component: PageWatchingVideoComponent },
    { path: 'user/watching/fromMyPlaylists/:videoId/:_idPlaylist', component: PageWatchingVideoComponent },
    { path: 'user/watching/fromHistory/:videoId/:source', component: PageWatchingVideoComponent },

    // Advertiser
    { path: 'advertiser', component: PageAdListAdvertiserComponent },
    { path: 'advertiser/adList', component: PageAdListAdvertiserComponent },
    { path: 'advertiser/myProfil', component: PageProfilAdvertiserComponent },
    { path: 'advertiser/adsPopularity', component: PagesPopularityComponent },
    { path: 'advertiser/subjectsPopularity', component: PagesPopularityComponent },

    // Admin
    { path: 'admin', component: PageUserListComponent },
    { path: 'admin/userList', component: PageUserListComponent },
    { path: 'admin/adList', component: PageAdListAdminComponent },
    { path: 'admin/myProfil', component: PageProfilAdminComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
