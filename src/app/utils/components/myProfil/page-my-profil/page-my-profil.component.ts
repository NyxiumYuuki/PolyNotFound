import { Component, OnInit } from '@angular/core';
import {MessageService} from "../../../services/message/message.service";
import {ThemeService} from "../../../services/theme/theme.service";
import {FictitiousDatasService} from "../../../services/fictitiousDatas/fictitious-datas.service";
import {MatDialog} from "@angular/material/dialog";
import {PopupAddVideoToPlaylistsComponent} from "../../popup-add-video-to-playlists/popup-add-video-to-playlists.component";
import {PopupPictureProfilUrlComponent} from "../popup-picture-profil-url/popup-picture-profil-url.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";



@Component({
  selector: 'app-page-my-profil',
  templateUrl: './page-my-profil.component.html',
  styleUrls: ['./page-my-profil.component.scss']
})
export class PageMyProfilComponent implements OnInit
{
    model = {
        _id: "",
        profilePictureUrl: "",
        login: "",
        mail: "",
        role: "",
        newPassword: ""
    };
    confirmNewPassword: string = "" ;
    changePassword: boolean = false ;
    hasError: boolean = false;
    errorMessage: string = "" ;
    forNavbar: string = "" ;


    constructor( private messageService: MessageService,
                 public themeService: ThemeService,
                 private fictitiousDatasService: FictitiousDatasService,
                 public dialog: MatDialog,
                 private snackBar: MatSnackBar,
                 private router: Router ) { }


    ngOnInit(): void
    {
        // --- FAUX CODE ---
        let profil ;
        if(this.router.url.startsWith("/user")) {
            profil = this.fictitiousDatasService.getUser();
            this.forNavbar = "user";
        }
        else if(this.router.url.startsWith("/advertiser")) {
            profil = this.fictitiousDatasService.getAdvertiser();
            this.forNavbar = "advertiser";
        }
        else if(this.router.url.startsWith("/admin")) {
            profil = this.fictitiousDatasService.getAdmin();
            this.forNavbar = "admin";
        }
        this.model._id = profil._id;
        this.model.profilePictureUrl = profil.profilePictureUrl;
        this.model.login = profil.login;
        this.model.mail = profil.mail;
        this.model.role = profil.role;

        // --- VRAI CODE ---
        /*
        this.messageService
            .sendMessage("user/get/profil", null)
            .subscribe( retour => {

                if(retour.status === "error") console.log(retour);
                else {
                    const profil = retour.data.profil;
                    this.model._id = profil._id;
                    this.model.profilePictureUrl = profil.profilePictureUrl;
                    this.model.pseudo = profil.pseudo;
                    this.model.email = profil.email;
                    this.model.role = profil.role;
                    this.model.newPassword = profil.newPassword;
                }
            });
        */
    }


    onEnregistrer()
    {
        console.log(this.model);
        this.checkField();

        // --- VRAI CODE ---
        /*
        if(!this.hasError)
        {
            this.messageService
                .sendMessage("user/set/profil", this.model)
                .subscribe( retour => {} );
        }
        */
    }


    checkField()
    {
        if(this.model.login.length === 0) {
            this.errorMessage = "Veuillez remplir le champ 'pseudo'"
            this.hasError = true;
        }
        else if(this.model.mail.length === 0)
        {
            this.errorMessage = "Veuillez remplir le champ 'email'"
            this.hasError = true;
        }
        else if(!this.isValidEmail(this.model.mail))
        {
            this.errorMessage = "Email invalide"
            this.hasError = true;
        }
        else if(this.changePassword)
        {
            if (this.model.newPassword.length === 0) {
                this.errorMessage = "Veuillez remplir le champ 'mot de passe'"
                this.hasError = true;
            } else if (this.model.newPassword !== this.confirmNewPassword) {
                this.errorMessage = "Le mot de passe est différent de sa confirmation"
                this.hasError = true;
            }
        }
        else {
            this.errorMessage = "" ;
            this.hasError = false;
        }
    }


    isValidEmail(email)
    {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }


    onChangePP()
    {
        const config = {
            width: '25%',
            data: { profilePictureUrl: this.model.profilePictureUrl }
        };
        this.dialog
            .open(PopupPictureProfilUrlComponent, config )
            .afterClosed()
            .subscribe(retour => {

                if((retour === null) || (retour === undefined)) {
                    const config = { duration: 1000, panelClass: "custom-class" };
                    this.snackBar.open( "Opération annulé", "", config);
                }
                else {
                    this.model.profilePictureUrl = retour;
                }
            });
    }

}
