import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {ProfilService} from "../../../utils/services/profil/profil.service";
import {MessageService} from "../../../utils/services/message/message.service";



@Component({
  selector: 'app-navbar-advertiser',
  templateUrl: './navbar-advertiser.component.html',
  styleUrls: ['./navbar-advertiser.component.scss']
})
export class NavbarAdvertiserComponent
{
    routes: string[] = [
        "/advertiser",                      // 0
        "/advertiser/adList",               // 1
        "/advertiser/adsPopularity",        // 2
        "/advertiser/subjectsPopularity",   // 3
        "/advertiser/myProfil"              // 4
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
        console.log(retour);
    }

}
