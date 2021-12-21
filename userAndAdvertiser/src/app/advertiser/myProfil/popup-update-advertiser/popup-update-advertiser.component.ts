import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MessageService} from "../../../utils/message/message.service";
import {ProfilService} from "../../../utils/profil/profil.service";



@Component({
    selector: 'app-popup-update-advertiser',
    templateUrl: './popup-update-advertiser.component.html',
    styleUrls: ['./popup-update-advertiser.component.scss']
})
export class PopupUpdateAdvertiserComponent implements OnInit
{
    advertiserCopy;
    newPassword: string = "";
    confirmNewPassword: string = "" ;
    changePassword: boolean = false ;
    hasError: boolean = false;
    errorMessage: string = "" ;


    constructor( public dialogRef: MatDialogRef<PopupUpdateAdvertiserComponent>,
                 @Inject(MAT_DIALOG_DATA) public data,
                 private messageService: MessageService,
                 private profilService: ProfilService ) { }


    ngOnInit(): void
    {
        const advertiser0 = this.data.advertiser;
        this.advertiserCopy = {
            _id: advertiser0._id,
            login: advertiser0.login,
            hashPass: advertiser0.hashPass,
            email: advertiser0.email,
            role: {
                name: advertiser0.role.name,
                permission: advertiser0.role.permission,
                isAccepted: advertiser0.role.isAccepted,
            },
            profileImageUrl: advertiser0.profileImageUrl,
            dateOfBirth: advertiser0.dateOfBirth,
            gender: advertiser0.gender,
            interests: [],
            company: advertiser0.company,
            isActive: advertiser0.isActive,
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
            if(this.changePassword) this.advertiserCopy.hashPass = this.newPassword;
            const data = {
                login: this.advertiserCopy.login,
                hashPass: this.advertiserCopy.hashPass,
                email: this.advertiserCopy.email,
                profileImageUrl: this.advertiserCopy.profileImageUrl,
                company: this.advertiserCopy.company
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
            this.profilService.setProfileImageUrl(this.advertiserCopy.profileImageUrl);
            this.dialogRef.close(this.advertiserCopy);
        }
    }


    checkField()
    {
        if(this.advertiserCopy.login.length === 0) {
            this.errorMessage = "Veuillez remplir le champ 'pseudo'" ;
            this.hasError = true;
        }
        else if(this.advertiserCopy.email.length === 0) {
            this.errorMessage = "Veuillez remplir le champ 'email'" ;
            this.hasError = true;
        }
        else if(!this.isValidEmail(this.advertiserCopy.email)) {
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
