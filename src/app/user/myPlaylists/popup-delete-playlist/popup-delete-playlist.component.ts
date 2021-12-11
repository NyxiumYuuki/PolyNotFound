import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MessageService} from "../../../utils/services/message/message.service";

@Component({
  selector: 'app-popup-delete-playlist',
  templateUrl: './popup-delete-playlist.component.html',
  styleUrls: ['./popup-delete-playlist.component.scss']
})
export class PopupDeletePlaylistComponent implements OnInit
{
    playlist;

    constructor( public dialogRef: MatDialogRef<PopupDeletePlaylistComponent>,
                 @Inject(MAT_DIALOG_DATA) public data,
                 private messageService: MessageService ) { }

    ngOnInit(): void
    {
        this.playlist = this.data;
    }

    onValidate(): void
    {
        this.messageService
            .delete("playlist/delete/"+this.playlist._id)
            .subscribe( retour => this.onValidateCallback(retour), err => this.onValidateCallback(err));
    }

    onValidateCallback(retour: any): void
    {
        if(retour.status !== "success") {
            console.log(retour);
            this.dialogRef.close(null);
        }
        else {
            this.dialogRef.close(true);
        }
    }

}
