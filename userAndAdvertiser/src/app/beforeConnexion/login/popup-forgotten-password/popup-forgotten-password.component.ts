import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";



@Component({
  selector: 'app-popup-forgotten-password',
  templateUrl: './popup-forgotten-password.component.html',
  styleUrls: ['./popup-forgotten-password.component.scss']
})
export class PopupForgottenPasswordComponent
{
    email: string;
    hasError: boolean = false;
    errorMessage: string = "";


    constructor(public dialogRef: MatDialogRef<PopupForgottenPasswordComponent>) {}


    // Click sur valider
    onValidate()
    {
        if(this.email.length === 0) {
            this.errorMessage = "Veuillez remplir le champ 'email'." ;
            this.hasError = true;
        }
        else if(!this.isValidEmail(this.email)) {
            this.errorMessage = "Email invalide." ;
            this.hasError = true;
        }
        else {
            this.errorMessage = "" ;
            this.hasError = false;
            this.dialogRef.close(true);
        }
    }


    // Indique si email a bien le format d'un email
    isValidEmail(email): boolean
    {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

}
