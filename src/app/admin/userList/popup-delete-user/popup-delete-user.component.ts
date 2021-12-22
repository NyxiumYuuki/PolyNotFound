import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MessageService} from "../../../utils/message/message.service";

@Component({
  selector: 'app-popup-delete-user',
  templateUrl: './popup-delete-user.component.html',
  styleUrls: ['./popup-delete-user.component.scss']
})
export class PopupDeleteUserComponent implements OnInit
{
    user;

    constructor( public dialogRef: MatDialogRef<PopupDeleteUserComponent>,
                 @Inject(MAT_DIALOG_DATA) public data,
                 private messageService: MessageService ) { }

    ngOnInit(): void
    {
        this.user = this.data.user;
    }

    onValidate(): void
    {
        // --- FAUX CODE ---
        this.dialogRef.close(true);
    }

}
