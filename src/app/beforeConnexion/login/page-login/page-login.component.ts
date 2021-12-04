import {Component, OnInit} from '@angular/core';
import {MessageService} from "../../../utils/services/message/message.service";
import {Router} from "@angular/router";
import {ThemeService} from "../../../utils/services/theme/theme.service";
import {MatDialog} from "@angular/material/dialog";
import {PopupForgottenPasswordComponent} from "../popup-forgotten-password/popup-forgotten-password.component";
import {MatSnackBar} from "@angular/material/snack-bar";



@Component({
    selector: 'app-page-login',
    templateUrl: './page-login.component.html',
    styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent implements OnInit
{
    email: string = "" ;
    password: string = "" ;
    hasError: boolean = false;
    errorMessage: string = "";


    constructor( private messageService: MessageService,
                 private router: Router,
                 public themeService: ThemeService,
                 public dialog: MatDialog,
                 private snackBar: MatSnackBar ) { }


    ngOnInit(): void {}


	onSeConnecter(): void
	{
        this.checkError();

        if(!this.hasError)
        {
            let data = {
                email: this.email,
                hashPass: this.password
            };
            this.messageService
                .post('user/auth', data)
                .subscribe( retour => this.onSeConnecterCallback(retour), err => this.onSeConnecterCallback(err));
        }
	}


    onSeConnecterCallback(retour): void
    {
        if(retour.status !== "success") {
            this.errorMessage = retour.error.data.reason;
            this.hasError = true;
        }
        else {
            this.router.navigateByUrl( '/user/search');
        }
    }


    onForgottenPassword(): void
    {
        this.dialog
            .open(PopupForgottenPasswordComponent, {width: '30%'})
            .afterClosed()
            .subscribe(result => {
                if((result !== null) && (result !== undefined))
                {
                    const config = { duration: 5000, panelClass: "custom-class" };
                    this.snackBar.open( "Un mail de réinitialisation de mot de passe vous a été envoyé.", "", config);
                }
            });
    }


    checkError(): void
    {
        if(this.email === "") {
            this.errorMessage = "Veuillez remplir le champ email" ;
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


    // Fonction de hashage (faible)
    hashage(input: string): string
    {
        let hash = 0;
        for (let i = 0; i < input.length; i++) {
            let ch = input.charCodeAt(i);
            hash = ((hash << 5) - hash) + ch;
            hash = hash & hash;
        }
        return hash.toString();
    }

}
