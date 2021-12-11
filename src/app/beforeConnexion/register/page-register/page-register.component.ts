import { Component } from '@angular/core';
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
        email: "",
        role: {
            name: "user",
            permission: 0,
        },
        profileImageUrl: "",
        dateOfBirth: null,
        gender: "man",
        interests: [],
        company: "",
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
            let data: any = Object.assign({}, this.user);
            if(this.user.role.name === "user") data.role = "user" ;
            else data.role = "advertiser";
            data.hashPass = this.password;
            this.messageService
                .post('user/create', data)
                .subscribe(retour => this.onEnregistrerCallback(retour), err => this.onEnregistrerCallback(err));
        }
    }


    // Gestion de la réponse du backend
    onEnregistrerCallback(retour): void
    {
        console.log(retour);
        if(retour.status !== "success") {

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
        if((this.user.role.name === 'advertiser') && (this.user.company.length === 0)) {
            this.errorMessage = "Veuillez remplir le champ 'entreprise'.";
            this.hasError = true;
        }
        else if(this.user.login.length === 0) {
            this.errorMessage = "Veuillez remplir le champ 'pseudo'.";
            this.hasError = true;
        }
        else if(this.user.email.length === 0) {
            this.errorMessage = "Veuillez remplir le champ 'email'.";
            this.hasError = true;
        }
        else if(!this.isValidEmail(this.user.email)) {
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

}
