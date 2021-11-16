import { Component, OnInit } from '@angular/core';
import {MessageService} from "../../../utils/services/message/message.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {PopupConfirmationComponent} from "../popup-confirmation/popup-confirmation.component";
import {ThemeService} from "../../../utils/services/theme/theme.service";
import {User} from "../../../utils/interfaces/user";



@Component({
    selector: 'app-page-register',
    templateUrl: './page-register.component.html',
    styleUrls: ['./page-register.component.scss']
})
export class PageRegisterComponent
{
    password: string = "";
    confirmPassword: string = "";
    hasError: boolean = false;
    errorMessage: string = "";
    user: User = {
        _id: "",
        login: "",
        hashPass: "",
        mail: "",
        role: {
            name: "user",
            permission: 0,
        },
        profilePictureUrl: "",
        dateOfBirth: null,
        gender: "man",
        interests: [],
        isActive: false,
        isAccepted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastConnexion: null
    };


    constructor( private messageService: MessageService,
                 private router: Router,
                 public dialog: MatDialog,
                 public themeService: ThemeService ) { }


    // Envoie de l'utilisateur au backend
    onEnregistrer(): void
    {
        this.checkField();
        if(!this.hasError)
        {
            if(this.user.role.name === "user") this.user.role.permission = 0;
            else this.user.role.permission = 5;
            this.user.hashPass = this.hashage(this.password);

            // FAUX CODE
            const retour = { status: "succes" };
            this.myCallback(retour);

            // VRAI CODE
            /*
            this.messageService
                .sendMessage('register', this.user)
                .subscribe(retour => this.myCallback(retour));
            */
        }
    }


    // Gestion de la réponde du backend
    myCallback(retour): void
    {
        if(retour.status === "error")
        {
            console.log(retour);
        }
        else
        {
            const config = {
                width: '25%',
                data: {roleName: this.user.role.name}
            };
            this.dialog
                .open(PopupConfirmationComponent, config)
                .afterClosed()
                .subscribe(result => this.router.navigateByUrl( '/login' ));
        }
    }


    // Check les champs saisies par l'utilisateur
    checkField(): void
    {
        if(this.user.login.length === 0) {
            this.errorMessage = "Veuillez remplir le champ 'login'.";
            this.hasError = true;
        }
        else if(this.user.mail.length === 0) {
            this.errorMessage = "Veuillez remplir le champ 'email'.";
            this.hasError = true;
        }
        else if(!this.isValidEmail(this.user.mail)) {
            this.errorMessage = "Email invalide.";
            this.hasError = true;
        }
        else if(this.password.length === 0) {
            this.errorMessage = "Veuillez remplir le champ 'mot de passe'.";
            this.hasError = true;
        }
        else if(this.password !== this.confirmPassword) {
            this.errorMessage = "Le mot de passe est différent de sa confirmation.";
            this.hasError = true;
        }
        else if((this.user.role.name === 'user') && ((this.user.dateOfBirth === undefined) || (this.user.dateOfBirth === null))) {
            this.errorMessage = "Veuillez remplir le champ 'date de naissance'.";
            this.hasError = true;
        }
        else {
            this.errorMessage = "" ;
            this.hasError = false;
        }
    }


    // Indique si email a bien le format d'un email
    isValidEmail(email): boolean
    {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }


    // Récupère la liste des centres d'intérets (car celle-ci est remplie à l'aide d'un component intermédiaire)
    onEventInputInterests(myInterets: string[]): void
    {
        this.user.interests = myInterets;
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
