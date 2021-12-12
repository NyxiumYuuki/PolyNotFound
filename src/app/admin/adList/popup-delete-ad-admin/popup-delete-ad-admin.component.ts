import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MessageService} from "../../../utils/services/message/message.service";



@Component({
    selector: 'app-popup-delete-ad-admin',
    templateUrl: './popup-delete-ad-admin.component.html',
    styleUrls: ['./popup-delete-ad-admin.component.scss']
})
export class PopupDeleteAdAdminComponent implements OnInit
{
    advert: any;


    constructor( public dialogRef: MatDialogRef<PopupDeleteAdAdminComponent>,
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
            .subscribe(ret => this.onValidateCallback(ret), err => this.onValidateCallback(err) );
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
