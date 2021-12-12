import {Component, Inject, OnInit} from '@angular/core';
import {User} from "../../../utils/interfaces/user";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MessageService} from "../../../utils/services/message/message.service";
import {ProfilService} from "../../../utils/services/profil/profil.service";



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
                 @Inject(MAT_DIALOG_DATA) public data,
                 private messageService: MessageService,
                 private profilService: ProfilService ) { }


    ngOnInit(): void
    {
        const admin0 = this.data.admin;
        this.adminCopy = {
            _id: admin0._id,
            login: admin0.login,
            hashPass: admin0.hashPass,
            email: admin0.email,
            role: {
                name: admin0.role.name,
                permission: admin0.role.permission,
                isAccepted: admin0.role.isAccepted,
            },
            profileImageUrl: admin0.profileImageUrl,
            dateOfBirth: admin0.dateOfBirth,
            gender: admin0.gender,
            interests: [],
            company: "",
            isActive: admin0.isActive,
            createdAt: admin0.createdAt,
            updatedAt: admin0.updatedAt,
            lastConnexion: admin0.lastConnexion
        };
        for(let interest of admin0.interests) this.adminCopy.interests.push(interest);
    }


    onValider()
    {
        this.checkField();
        if(!this.hasError)
        {
            if(this.changePassword) this.adminCopy.hashPass = this.newPassword;
            const data = {
                login: this.adminCopy.login,
                hashPass: this.adminCopy.hashPass,
                email: this.adminCopy.email,
                profileImageUrl: this.adminCopy.profileImageUrl,
            };
            this.messageService
                .put("user/update/"+this.profilService.id, data)
                .subscribe( ret => this.onValiderCallback(ret), err => this.onValiderCallback(err) );
        }
    }


    onValiderCallback(retour: any)
    {
        if(retour.status !== "success") {
            console.log(retour);
            this.dialogRef.close(null);
        }
        else {
            this.dialogRef.close(this.adminCopy);
        }
    }


    checkField()
    {
        if(this.adminCopy.login.length === 0) {
            this.errorMessage = "Veuillez remplir le champ 'pseudo'" ;
            this.hasError = true;
        }
        else if(this.adminCopy.email.length === 0) {
            this.errorMessage = "Veuillez remplir le champ 'email'" ;
            this.hasError = true;
        }
        else if(!this.isValidEmail(this.adminCopy.email)) {
            this.errorMessage = "Email invalide" ;
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

}
