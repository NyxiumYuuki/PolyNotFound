import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {ProfilService} from "../../../utils/services/profil/profil.service";
import {MessageService} from "../../../utils/services/message/message.service";



@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss']
})
export class NavbarAdminComponent
{
    routes: string[] = [
        "/admin",               // 0
        "/admin/userList",      // 1
        "/admin/adList",        // 2
        "/admin/myProfil",      // 3
    ];

    url = this.router.url;

    constructor( private router: Router,
                 public profilService: ProfilService,
                 private messageService: MessageService ) { }

    onDeconnexion(): void
    {
        this.messageService
            .delete('user/logout')
            .subscribe(retour => this.onDeconnexionCallback(retour), err => this.onDeconnexionCallback(err));
    }

    onDeconnexionCallback(retour: any): void
    {
        if(retour.status !== "success") console.log(retour);
    }

}
