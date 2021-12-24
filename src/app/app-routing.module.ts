import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageLoginComponent} from "./beforeConnexion/login/page-login/page-login.component";
import {PageRegisterComponent} from "./beforeConnexion/register/page-register/page-register.component";
import {PageAdListAdminComponent} from "./admin/adList/page-ad-list-admin/page-ad-list-admin.component";
import {PageProfilAdminComponent} from "./admin/myProfil/page-profil-admin/page-profil-admin.component";
import {PageUserListComponent} from "./admin/userList/page-user-list/page-user-list.component";
import {MyGuardGuard} from "./utils/my-guard/my-guard.guard";

const routes: Routes = [

    // Before connexion
    { path: '', component: PageLoginComponent },
    { path: 'login', component: PageLoginComponent },
    { path: 'register', component: PageRegisterComponent },

    // Admin
    { path: 'admin', component: PageUserListComponent, canActivate: [MyGuardGuard] },
    { path: 'admin/userList', component: PageUserListComponent, canActivate: [MyGuardGuard] },
    { path: 'admin/adList', component: PageAdListAdminComponent, canActivate: [MyGuardGuard] },
    { path: 'admin/myProfil', component: PageProfilAdminComponent, canActivate: [MyGuardGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
