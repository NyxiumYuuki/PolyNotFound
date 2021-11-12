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
            mail: user0.mail,
            role: {
                name: user0.role.name,
                permission: user0.role.permission,
            },
            profilePictureUrl: user0.profilePictureUrl,
            dateOfBirth: user0.dateOfBirth,
            gender: user0.gender,
            interests: [],
            isActive: user0.isActive,
            createdAt: user0.createdAt,
            updatedAt: user0.updatedAt,
        };
        for(let interest of user0.interests) this.userCopy.interests.push(interest);
    }


    onValider()
    {
        this.checkField();
        if(!this.hasError)
        {
            const data = {
                user: this.userCopy,
                newPassword: this.newPassword
            };

            // VRAI CODE: envoie au back ...

            this.dialogRef.close(this.userCopy);
        }
    }


    checkField()
    {
        if(this.userCopy.login.length === 0) {
            this.errorMessage = "Veuillez remplir le champ 'login'" ;
            this.hasError = true;
        }
        else if(this.userCopy.mail.length === 0) {
            this.errorMessage = "Veuillez remplir le champ 'email'" ;
            this.hasError = true;
        }
        else if(!this.isValidEmail(this.userCopy.mail)) {
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
        this.userCopy.interests = myInterets;
    }

}
