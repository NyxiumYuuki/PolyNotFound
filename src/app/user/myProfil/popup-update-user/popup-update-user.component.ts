import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../utils/interfaces/user";



@Component({
    selector: 'app-popup-update-user',
    templateUrl: './popup-update-user.component.html',
    styleUrls: ['./popup-update-user.component.scss']
})
export class PopupUpdateUserComponent implements OnInit
{
    userCopy: User;
    newPassword: string = "";
    confirmNewPassword: string = "" ;
    changePassword: boolean = false ;
    hasError: boolean = false;
    errorMessage: string = "" ;


    constructor( public dialogRef: MatDialogRef<PopupUpdateUserComponent>,
                 @Inject(MAT_DIALOG_DATA) public data) { }


    ngOnInit(): void
    {
        const user0 = this.data.user;
        this.userCopy = {
            _id: user0._id,
            login: user0.login,
            hashPass: user0.hashPass,
            email: user0.email,
            role: {
                name: user0.role.name,
                permission: user0.role.permission,
            },
            profileImageUrl: user0.profileImageUrl,
            dateOfBirth: user0.dateOfBirth,
            gender: user0.gender,
            interests: [],
            company: "",
            isActive: user0.isActive,
            isAccepted: user0.isAccepted,
            createdAt: user0.createdAt,
            updatedAt: user0.updatedAt,
            lastConnexion: new Date()
        };
        for(let interest of user0.interests) this.userCopy.interests.push(interest);
    }


    onValider()
    {
        this.checkField();
        if(!this.hasError)
        {
            if(this.changePassword) this.userCopy.hashPass = this.hashage(this.newPassword);
            const data = { user: this.userCopy };

            // VRAI CODE: envoie au back ...

            this.dialogRef.close(this.userCopy);
        }
    }


    checkField()
    {
        if(this.userCopy.login.length === 0) {
            this.errorMessage = "Veuillez remplir le champ 'pseudo'." ;
            this.hasError = true;
        }
        else if(this.userCopy.email.length === 0) {
            this.errorMessage = "Veuillez remplir le champ 'email'." ;
            this.hasError = true;
        }
        else if(!this.isValidEmail(this.userCopy.email)) {
            this.errorMessage = "Email invalide." ;
            this.hasError = true;
        }
        else if((this.changePassword) && (this.newPassword.length === 0)) {
            this.errorMessage = "Veuillez remplir le champ 'mot de passe'" ;
            this.hasError = true;
        }
        else if((this.changePassword) && (this.newPassword !== this.confirmNewPassword)) {
            this.errorMessage = "Le mot de passe est différent de sa confirmation" ;
            this.hasError = true;
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


    onEventInputInterests(myInterets: string[])
    {
        this.userCopy.interests = myInterets;
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
