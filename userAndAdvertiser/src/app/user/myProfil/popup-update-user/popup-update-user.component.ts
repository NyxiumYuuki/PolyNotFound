import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MessageService} from "../../../utils/message/message.service";
import {ProfilService} from "../../../utils/profil/profil.service";



@Component({
    selector: 'app-popup-update-user',
    templateUrl: './popup-update-user.component.html',
    styleUrls: ['./popup-update-user.component.scss']
})
export class PopupUpdateUserComponent implements OnInit
{
    userCopy;
    newPassword: string = "";
    confirmNewPassword: string = "" ;
    changePassword: boolean = false ;
    hasError: boolean = false;
    errorMessage: string = "" ;


    constructor( public dialogRef: MatDialogRef<PopupUpdateUserComponent>,
                 @Inject(MAT_DIALOG_DATA) public data,
                 private messageService: MessageService,
                 private profilService: ProfilService ) { }


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
                isAccepted: user0.role.isAccepted,
            },
            profileImageUrl: user0.profileImageUrl,
            dateOfBirth: user0.dateOfBirth,
            gender: user0.gender,
            interests: [],
            company: "",
            isActive: user0.isActive,
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
            if(this.changePassword) this.userCopy.hashPass = this.newPassword;
            const data = {
                login: this.userCopy.login,
                hashPass: this.userCopy.hashPass,
                email: this.userCopy.email,
                profileImageUrl: this.userCopy.profileImageUrl,
                dateOfBirth: this.userCopy.dateOfBirth,
                gender: this.userCopy.gender,
                interests: this.userCopy.interests,
            };
            this.messageService
                .put("user/update/"+this.profilService.getId(), data)
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
            this.profilService.setProfileImageUrl(this.userCopy.profileImageUrl);
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

}
