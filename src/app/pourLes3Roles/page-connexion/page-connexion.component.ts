import {Component, OnInit} from '@angular/core';
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
    pseudo: string = "" ;
    password: string = "" ;
    hasError: boolean = false;
    errorMessage: string = "";


    constructor( private messageService: MessageService,
                 private router: Router,
                 public themeService: ThemeService ) { }


    ngOnInit(): void {}


	onSeConnecter(): void
	{
        this.checkError();

        if(!this.hasError)
        {
            let data = {
                "pseudo": this.pseudo,
                "password": this.password
            };
            this.messageService
                .sendMessage('connexion', data)
                .subscribe( retour => this.maCallback(retour))
        }
	}


    maCallback(retour): void
    {
        console.log(retour.data)
        if(retour.status === "error") {
            this.errorMessage = retour.data.reason;
            this.hasError = true;
        }
        else {
            //this.router.navigateByUrl( '/search' );
        }
    }


    checkError(): void
    {
        if(this.pseudo === "") {
            this.errorMessage = "Veuillez remplir le champ login" ;
            this.hasError = true;
        }
        else if(this.password === "") {
            this.errorMessage = "Veuillez remplir le champ mot de passe" ;
            this.hasError = true;
        }
        else {
            this.errorMessage = "" ;
            this.hasError = false;
        }
    }

}
