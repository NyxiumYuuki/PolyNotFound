import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MessageService} from "../../../utils/services/message/message.service";
import {Advert} from "../../../utils/interfaces/advert";



@Component({
  selector: 'app-popup-delete-ad-advertiser',
  templateUrl: './popup-delete-ad-advertiser.component.html',
  styleUrls: ['./popup-delete-ad-advertiser.component.scss']
})
export class PopupDeleteAdAdvertiserComponent implements OnInit
{
    advert: Advert;


    constructor( public dialogRef: MatDialogRef<PopupDeleteAdAdvertiserComponent>,
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
            .sendMessage("advertiser/delete/ad", {"advert": this.advert})
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
