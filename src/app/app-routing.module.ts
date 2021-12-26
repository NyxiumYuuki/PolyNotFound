import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageLoginComponent} from "./beforeConnexion/login/page-login/page-login.component";
import {PageRegisterComponent} from "./beforeConnexion/register/page-register/page-register.component";
import {PageSearchComponent} from "./user/search/page-search/page-search.component";
import {PageMyPlaylistsComponent} from "./user/myPlaylists/page-my-playlists/page-my-playlists.component";
import {PageProfilUserComponent} from "./user/myProfil/page-profil-user/page-profil-user.component";
import {PageWatchingVideoComponent} from "./user/watching/page-watching-video/page-watching-video.component";
import {PageHistoryUserComponent} from "./user/history/page-history-user/page-history-user.component";
import {PageAdListAdvertiserComponent} from "./advertiser/adList/page-ad-list-advertiser/page-ad-list-advertiser.component";
import {PagesPopularityComponent} from "./advertiser/pages-popularity/pages-popularity.component";
import {PageProfilAdvertiserComponent} from "./advertiser/myProfil/page-profil-advertiser/page-profil-advertiser.component";
import {UserGuard} from "./utils/guards/user/user.guard";
import {AdvertiserGuard} from "./utils/guards/advertiser/advertiser.guard";


const routes: Routes = [
    // Before connexion
    { path: '', component: PageLoginComponent },
    { path: 'login', component: PageLoginComponent },
    { path: 'register', component: PageRegisterComponent },

    // User
    { path: 'user', component: PageSearchComponent, canActivate: [UserGuard] },
    { path: 'user/search', component: PageSearchComponent, canActivate: [UserGuard] },
    { path: 'user/myPlaylists', component: PageMyPlaylistsComponent, canActivate: [UserGuard] },
    { path: 'user/history', component: PageHistoryUserComponent, canActivate: [UserGuard] },
    { path: 'user/myProfil', component:  PageProfilUserComponent, canActivate: [UserGuard] },
    { path: 'user/watching', component:  PageWatchingVideoComponent, canActivate: [UserGuard] },

    // Advertiser
    { path: 'advertiser', component: PageAdListAdvertiserComponent, canActivate: [AdvertiserGuard] },
    { path: 'advertiser/adList', component: PageAdListAdvertiserComponent, canActivate: [AdvertiserGuard] },
    { path: 'advertiser/myProfil', component: PageProfilAdvertiserComponent, canActivate: [AdvertiserGuard] },
    { path: 'advertiser/adsPopularity', component: PagesPopularityComponent, canActivate: [AdvertiserGuard] },
    { path: 'advertiser/subjectsPopularity', component: PagesPopularityComponent, canActivate: [AdvertiserGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
