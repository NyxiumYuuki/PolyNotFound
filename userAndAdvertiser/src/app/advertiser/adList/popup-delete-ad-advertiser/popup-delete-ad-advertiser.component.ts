import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MessageService} from "../../../utils/message/message.service";



@Component({
  selector: 'app-popup-delete-ad-advertiser',
  templateUrl: './popup-delete-ad-advertiser.component.html',
  styleUrls: ['./popup-delete-ad-advertiser.component.scss']
})
export class PopupDeleteAdAdvertiserComponent implements OnInit
{
    advert: any;


    constructor( public dialogRef: MatDialogRef<PopupDeleteAdAdvertiserComponent>,
                 @Inject(MAT_DIALOG_DATA) public data,
                 private messageService: MessageService) { }


    ngOnInit(): void
    {
        this.advert = this.data.advert;
    }


    onValidate(): void
    {
         this.messageService
            .delete("ad/delete/"+this.advert.id)
            .subscribe(ret => this.onValidateCallback(ret), err => this.onValidateCallback(err));
    }


    onValidateCallback(retour: any): void
    {
        if(retour.status !== "success") {
            console.log(retour);
            this.dialogRef.close();
        }
        else {
            this.dialogRef.close(true);
        }
    }

}
