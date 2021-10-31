import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageConnexionComponent} from './pourLes3Roles/page-connexion/page-connexion.component';
import {PageRegisterComponent} from './pourLes3Roles/register/page-register/page-register.component';
import {PageSearchComponent} from "./user/search/page-search/page-search.component";
import {PageMyPlaylistsComponent} from "./user/myPlaylists/page-my-playlists/page-my-playlists.component";
import {PageHistoriqueComponent} from "./user/historique/page-historique/page-historique.component";
import {PageMyProfilComponent} from "./user/myProfil/page-my-profil/page-my-profil.component";


const routes: Routes = [
    { path: '', component: PageConnexionComponent },
    { path: 'connexion', component: PageConnexionComponent },
    { path: 'register', component: PageRegisterComponent },

    { path: 'user/search', component: PageSearchComponent },
    { path: 'user/myPlaylists', component: PageMyPlaylistsComponent },
    { path: 'user/history', component: PageHistoriqueComponent },
    { path: 'user/myProfil', component: PageMyProfilComponent },

    { path: 'advertiser/addAd', component: PageConnexionComponent },
    { path: 'advertiser/adList', component: PageConnexionComponent },
    { path: 'advertiser/history', component: PageConnexionComponent },
    { path: 'advertiser/myProfil', component: PageConnexionComponent },

    { path: 'admin/userList', component: PageConnexionComponent },
    { path: 'admin/addUser', component: PageConnexionComponent },
    { path: 'admin/adList', component: PageConnexionComponent },
    { path: 'admin/myProfil', component: PageConnexionComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
