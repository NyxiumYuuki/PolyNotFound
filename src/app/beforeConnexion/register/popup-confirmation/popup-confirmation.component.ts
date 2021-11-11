import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-popup-confirmation',
    templateUrl: './popup-confirmation.component.html',
    styleUrls: ['./popup-confirmation.component.scss']
})
export class PopupConfirmationComponent
{
    constructor( public dialogRef: MatDialogRef<PopupConfirmationComponent>,
                 @Inject(MAT_DIALOG_DATA) public data) {}

    onClick(): void
    {
        this.dialogRef.close();
    }
}
