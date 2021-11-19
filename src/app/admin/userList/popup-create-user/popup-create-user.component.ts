import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../utils/interfaces/user";



@Component({
  selector: 'app-popup-create-user',
  templateUrl: './popup-create-user.component.html',
  styleUrls: ['./popup-create-user.component.scss']
})
export class PopupCreateUserComponent implements OnInit
{
    user: User;
    hasError: boolean = false;
    errorMessage: string = "";
    password: string = "";
    confirmPassword: string = "";


    constructor( public dialogRef: MatDialogRef<PopupCreateUserComponent>,
                 @Inject(MAT_DIALOG_DATA) public data ) { }


    // Initialise l'utilisateur qui va être créé
    ngOnInit(): void
    {
        this.user = {
            _id: "",
            login: "",
            hashPass: "",
            email: "",
            role: {
                name: "",
                permission: 0,
            },
            profileImageUrl: "",
            dateOfBirth: null,
            gender: "man",
            interests: [],
            isActive: false,
            isAccepted: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            lastConnexion: new Date()
        };
    }


    // Crée le nouvel utilisateur
    onEnregistrer(): void
    {
        this.checkField();

        if(!this.hasError)
        {
            this.user.hashPass = this.hashage(this.password);
            this.dialogRef.close(this.user);
            // VRAI CODE ...
        }
    }


    // Check les champs saisies par l'utilisateur
    checkField(): void
    {
        if(this.user.login.length === 0) {
            this.errorMessage = "Veuillez remplir le champ 'login'.";
            this.hasError = true;
        }
        else if(this.user.email.length === 0) {
            this.errorMessage = "Veuillez remplir le champ 'email'.";
            this.hasError = true;
        }
        if((this.user.role.name === 'user') && ((this.user.dateOfBirth === undefined) || (this.user.dateOfBirth === null))) {
            this.errorMessage = "Veuillez remplir le champ 'date de naissance'.";
            this.hasError = true;
        }
        else if(!this.isValidEmail(this.user.email)) {
            this.errorMessage = "Email invalide";
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
