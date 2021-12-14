import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {ProfilService} from "../../../../utils/services/profil/profil.service";
import {MessageService} from "../../../../utils/services/message/message.service";



@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.scss']
})
export class NavbarUserComponent
{
    routes: string[] = [
        "/user",                // 0
        "/user/search",         // 1
        "/user/myPlaylists",    // 2
        "/user/history",        // 3
        "/user/myProfil"        // 4
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
