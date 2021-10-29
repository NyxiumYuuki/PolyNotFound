import { Component, OnInit } from '@angular/core';
import {MessageService} from "../../../utils/services/message/message.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {PopupConfirmationComponent} from "../popup-confirmation/popup-confirmation.component";
import {ThemeService} from "../../../utils/services/theme/theme.service";

@Component({
  selector: 'app-page-register',
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.scss']
})
export class PageRegisterComponent implements OnInit
{
    pseudo: string = "";
    email: string = "" ;
    password: string = "";
    confirmPassword: string = "";
    hasError: boolean = false;
    errorMessage: string = "";


    constructor( private messageService: MessageService,
                 private router: Router,
                 public dialog: MatDialog,
                 public themeService: ThemeService ) { }


    ngOnInit(): void {}


    isValidEmail(email)
    {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }


    verifierChamps(): void
    {
        if(this.pseudo.length === 0) {
            this.errorMessage = "Veuillez remplir le champ 'pseudo'"
            this.hasError = true;
        }
        else if(this.email.length === 0)
        {
            this.errorMessage = "Veuillez remplir le champ 'email'"
            this.hasError = true;
        }
        else if(!this.isValidEmail(this.email))
        {
            this.errorMessage = "Email invalide"
            this.hasError = true;
        }
        else if(this.password.length === 0)
        {
            this.errorMessage = "Veuillez remplir le champ 'mot de passe'"
            this.hasError = true;
        }
        else if(this.password !== this.confirmPassword)
        {
            this.errorMessage = "Le mot de passe est différent de sa confirmation"
            this.hasError = true;
        }
        else {
            this.hasError = false;
        }
    }


    onValider(): void
    {
        this.verifierChamps()
        console.log(this.hasError)
        if(!this.hasError)
        {
            let data = { "pseudo": this.pseudo, "email": this.email, "password": this.password }
            this.messageService
                .sendMessage('register', data)
                .subscribe(retour => this.maCallback(retour))
        }
    }


    maCallback(retour): void
    {
        if(retour.status === "error") console.log(retour.data)
        else
        {
            const config = { width: '25%', data: {} }
            this.dialog
                .open(PopupConfirmationComponent, config )
                .afterClosed()
                .subscribe(result => this.router.navigateByUrl( '/connexion' ));
        }
    }
}
