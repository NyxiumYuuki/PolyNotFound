import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageConnexionComponent} from './pourLes3Roles/page-connexion/page-connexion.component';
import {PageRegisterComponent} from './pourLes3Roles/register/page-register/page-register.component';
import {PageSearchComponent} from "./user/search/page-search/page-search.component";
import {PageMyPlaylistsComponent} from "./user/myPlaylists/page-my-playlists/page-my-playlists.component";


const routes: Routes = [
    { path: '', component: PageConnexionComponent },
    { path: 'connexion', component: PageConnexionComponent },
    { path: 'register', component: PageRegisterComponent },
    { path: 'search', component: PageSearchComponent },
    { path: 'myPlaylists', component: PageMyPlaylistsComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
