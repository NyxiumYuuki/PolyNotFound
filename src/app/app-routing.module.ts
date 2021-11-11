import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageLoginComponent} from './beforeConnexion/login/page-login/page-login.component';
import {PageRegisterComponent} from "./beforeConnexion/register/page-register/page-register.component";
import {PageSearchComponent} from "./user/search/page-search/page-search.component";
import {PageMyPlaylistsComponent} from "./user/myPlaylists/page-my-playlists/page-my-playlists.component";
import {PageHistoryUserComponent} from "./user/history/page-history-user/page-history-user.component";
import {PageAdvertiserComponent} from "./advertiser/manageAds/page-advertiser/page-advertiser.component";
import {PageProfilUserComponent} from "./user/myProfil/page-profil-user/page-profil-user.component";
import {PageProfilAdvertiserComponent} from "./advertiser/myProfil/page-profil-advertiser/page-profil-advertiser.component";


const routes: Routes = [
    { path: '', component: PageLoginComponent },
    { path: 'login', component: PageLoginComponent },
    { path: 'register', component: PageRegisterComponent },

    { path: 'user', component: PageSearchComponent },
    { path: 'user/search', component: PageSearchComponent },
    { path: 'user/myPlaylists', component: PageMyPlaylistsComponent },
    { path: 'user/history', component: PageHistoryUserComponent },
    { path: 'user/myProfil', component:  PageProfilUserComponent },

    { path: 'advertiser', component: PageAdvertiserComponent },
    { path: 'advertiser/myProfil', component: PageProfilAdvertiserComponent },

    /*
    { path: 'admin/userList', component: PageLoginComponent },
    { path: 'admin/addUser', component: PageLoginComponent },
    { path: 'admin/adList', component: PageLoginComponent },
    { path: 'admin/myProfil', component: PageProfilAdminComponent }
    */
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
