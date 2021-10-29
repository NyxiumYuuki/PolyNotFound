import { Component, OnInit } from '@angular/core';
import {MessageService} from "../../utils/services/message/message.service";
import {Router} from "@angular/router";
import {ThemeService} from "../../utils/services/theme/theme.service";


@Component({
    selector: 'app-page-connexion',
    templateUrl: './page-connexion.component.html',
    styleUrls: ['./page-connexion.component.scss']
})
export class PageConnexionComponent implements OnInit
{
    email: string = ""
    password: string = ""

    constructor( private messageService: MessageService,
                 private router: Router,
                 public themeService: ThemeService ) { }


    ngOnInit(): void {}


	onSeConnecter(): void
	{
        let data = {
            "email": this.email,
            "password": this.password
        };
        this.messageService
            .sendMessage('connexion', data)
            .subscribe( retour => this.maCallback(retour))
	}


    maCallback(retour): void
    {
        if(retour.status === "error") console.log(retour.data)
        else {
            console.log(retour.data)
            //this.router.navigateByUrl( '/search' );
        }
    }
}