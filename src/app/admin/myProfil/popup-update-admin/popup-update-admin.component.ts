import {Component, Inject, OnInit} from '@angular/core';
import {User} from "../../../utils/interfaces/user";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-popup-update-admin',
    templateUrl: './popup-update-admin.component.html',
    styleUrls: ['./popup-update-admin.component.scss']
})
export class PopupUpdateAdminComponent implements OnInit
{
    adminCopy: User;
    newPassword: string = "";
    confirmNewPassword: string = "" ;
    changePassword: boolean = false ;
    hasError: boolean = false;
    errorMessage: string = "" ;


    constructor( public dialogRef: MatDialogRef<PopupUpdateAdminComponent>,
                 @Inject(MAT_DIALOG_DATA) public data) { }


    ngOnInit(): void
    {
        const admin0 = this.data.admin;
        this.adminCopy = {
            _id: admin0._id,
            login: admin0.login,
            hashPass: admin0.hashPass,
            mail: admin0.mail,
            role: {
                name: admin0.role.name,
                permission: admin0.role.permission,
            },
            profilePictureUrl: admin0.profilePictureUrl,
            dateOfBirth: admin0.dateOfBirth,
            gender: admin0.gender,
            interests: [],
            isActive: admin0.isActive,
            isAccepted: admin0.isisAccepted,
            createdAt: admin0.createdAt,
            updatedAt: admin0.updatedAt,
        };
        for(let interest of admin0.interests) this.adminCopy.interests.push(interest);
    }


    onValider()
    {
        this.checkField();
        if(!this.hasError)
        {
            const data = {
                user: this.adminCopy,
                newPassword: this.newPassword
            };

            // VRAI CODE: envoie au back ...

            this.dialogRef.close(this.adminCopy);
        }
    }


    checkField()
    {
        if(this.adminCopy.login.length === 0) {
            this.errorMessage = "Veuillez remplir le champ 'login'" ;
            this.hasError = true;
        }
        else if(this.adminCopy.mail.length === 0) {
            this.errorMessage = "Veuillez remplir le champ 'email'" ;
            this.hasError = true;
        }
        else if(!this.isValidEmail(this.adminCopy.mail)) {
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


    onEventInputInterests(myInterets: string[])
    {
        this.adminCopy.interests = myInterets;
    }
}
