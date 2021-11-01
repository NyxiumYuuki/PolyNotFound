import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageConnexionComponent} from './pourLes3Roles/page-connexion/page-connexion.component';
import {PageRegisterComponent} from './pourLes3Roles/register/page-register/page-register.component';
import {PageSearchComponent} from "./user/search/page-search/page-search.component";
import {PageMyPlaylistsComponent} from "./user/myPlaylists/page-my-playlists/page-my-playlists.component";
import {PageHistoryUserComponent} from "./user/history/page-history-user/page-history-user.component";
import {PageMyProfilComponent} from "./utils/components/myProfil/page-my-profil/page-my-profil.component";
import {PageAdvertiserComponent} from "./advertiser/page-advertiser/page-advertiser.component";


const routes: Routes = [
    { path: '', component: PageConnexionComponent },
    { path: 'login', component: PageConnexionComponent },
    { path: 'register', component: PageRegisterComponent },

    { path: 'user', component: PageSearchComponent },
    { path: 'user/search', component: PageSearchComponent },
    { path: 'user/myPlaylists', component: PageMyPlaylistsComponent },
    { path: 'user/history', component: PageHistoryUserComponent },
    { path: 'user/myProfil', component: PageMyProfilComponent },

    { path: 'advertiser', component: PageAdvertiserComponent },
    { path: 'advertiser/myProfil', component: PageMyProfilComponent },

    /*
    { path: 'admin/userList', component: PageConnexionComponent },
    { path: 'admin/addUser', component: PageConnexionComponent },
    { path: 'admin/adList', component: PageConnexionComponent },
    { path: 'admin/myProfil', component: PageMyProfilComponent }
    */
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
