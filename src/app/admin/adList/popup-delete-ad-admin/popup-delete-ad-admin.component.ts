import {Component, Inject, OnInit} from '@angular/core';
import {Advert} from "../../../utils/interfaces/advert";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MessageService} from "../../../utils/services/message/message.service";



@Component({
    selector: 'app-popup-delete-ad-admin',
    templateUrl: './popup-delete-ad-admin.component.html',
    styleUrls: ['./popup-delete-ad-admin.component.scss']
})
export class PopupDeleteAdAdminComponent implements OnInit
{
    advert: Advert;


    constructor( public dialogRef: MatDialogRef<PopupDeleteAdAdminComponent>,
                 @Inject(MAT_DIALOG_DATA) public data,
                 private messageService: MessageService) { }


    ngOnInit(): void
    {
        this.advert = this.data.advert;
    }


    onValidate(): void
    {
        // --- FAUX CODE ---
        this.dialogRef.close(true);

        // --- VRAI CODE ---
        /*
        this.messageService
            .sendMessage("url/delete/ad", {"advert": this.advert})
            .subscribe( retour => {

                if(retour.status === "error") {
                    console.log(retour);
                    this.dialogRef.close();
                }
                else {
                    this.dialogRef.close(true);
                }
            });
        */
    }

}
