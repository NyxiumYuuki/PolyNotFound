import {Component, Inject, OnInit} from '@angular/core';
import {User} from "../../../utils/interfaces/user";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";



@Component({
    selector: 'app-popup-update-advertiser',
    templateUrl: './popup-update-advertiser.component.html',
    styleUrls: ['./popup-update-advertiser.component.scss']
})
export class PopupUpdateAdvertiserComponent implements OnInit
{
    advertiserCopy: User;
    newPassword: string = "";
    confirmNewPassword: string = "" ;
    changePassword: boolean = false ;
    hasError: boolean = false;
    errorMessage: string = "" ;


    constructor( public dialogRef: MatDialogRef<PopupUpdateAdvertiserComponent>,
                 @Inject(MAT_DIALOG_DATA) public data) { }


    ngOnInit(): void
    {
        const advertiser0 = this.data.advertiser;
        this.advertiserCopy = {
            _id: advertiser0._id,
            login: advertiser0.login,
            hashPass: advertiser0.hashPass,
            mail: advertiser0.mail,
            role: {
                name: advertiser0.role.name,
                permission: advertiser0.role.permission,
            },
            profilePictureUrl: advertiser0.profilePictureUrl,
            dateOfBirth: advertiser0.dateOfBirth,
            gender: advertiser0.gender,
            interests: [],
            isActive: advertiser0.isActive,
            isAccepted: advertiser0.isAccepted,
            createdAt: advertiser0.createdAt,
            updatedAt: advertiser0.updatedAt,
            lastConnexion: new Date()
        };
        for(let interest of advertiser0.interests) this.advertiserCopy.interests.push(interest);
    }


    onValider()
    {
        this.checkField();
        if(!this.hasError)
        {
            if(this.changePassword) this.advertiserCopy.hashPass = this.hashage(this.newPassword);
            const data = { user: this.advertiserCopy };

            // VRAI CODE: envoie au back ...

            this.dialogRef.close(this.advertiserCopy);
        }
    }


    checkField()
    {
        if(this.advertiserCopy.login.length === 0) {
            this.errorMessage = "Veuillez remplir le champ 'login'" ;
            this.hasError = true;
        }
        else if(this.advertiserCopy.mail.length === 0) {
            this.errorMessage = "Veuillez remplir le champ 'email'" ;
            this.hasError = true;
        }
        else if(!this.isValidEmail(this.advertiserCopy.mail)) {
            this.errorMessage = "Email invalide" ;
            this.hasError = true;
        }
        else if(this.changePassword) {
            if (this.newPassword.length === 0) {
                this.errorMessage = "Veuillez remplir le champ 'mot de passe'" ;
                this.hasError = true;
            } else if (this.newPassword !== this.confirmNewPassword) {
                this.errorMessage = "Le mot de passe est différent de sa confirmation" ;
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
