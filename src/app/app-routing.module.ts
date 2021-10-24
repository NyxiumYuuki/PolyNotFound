import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageConnexionComponent} from './page-connexion/page-connexion.component';
import {PageRegisterComponent} from './page-register/page-register.component';

const routes: Routes = [
  { path: 'connexion', component: PageConnexionComponent },
  { path: 'register', component: PageRegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
