import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {PopupForgottenPasswordComponent} from "../popup-forgotten-password/popup-forgotten-password.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProfilService} from "../../../utils/profil/profil.service";
import {MessageService} from "../../../utils/message/message.service";
import {ThemeService} from "../../../utils/theme/theme.service";



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
                 private snackBar: MatSnackBar,
                 private profilService: ProfilService) { }


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


    onSeConnecterCallback(retour: any): void
    {
        if(retour.status !== "success") {
            console.log(retour);
            this.errorMessage = retour.error.reason;
            this.hasError = true;
        }
        else {
            this.profilService.setId(retour.data.id);
            this.profilService.setProfileImageUrl(retour.data.profileImageUrl);
            if(retour.data.role.name === "user") this.router.navigateByUrl( '/user/search');
            else if(retour.data.role.name === "advertiser") this.router.navigateByUrl( '/advertiser/adList');
            else if(retour.data.role.name === "admin" || retour.data.role.name === "superAdmin") this.router.navigateByUrl( '/admin/userList');
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

}
