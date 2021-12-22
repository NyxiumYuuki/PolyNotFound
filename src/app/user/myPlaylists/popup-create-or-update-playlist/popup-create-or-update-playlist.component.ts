import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MessageService} from "../../../utils/message/message.service";



@Component({
    selector: 'app-popup-create-or-update-playlist',
    templateUrl: './popup-create-or-update-playlist.component.html',
    styleUrls: ['./popup-create-or-update-playlist.component.scss']
})
export class PopupCreateOrUpdatePlaylistComponent implements OnInit
{
    name: string = "" ;
    hasError: boolean = false;
    tabNomPlaylist: string[] = [];
    errorMessage: string = "" ;
    action: string = "";


    constructor( public dialogRef: MatDialogRef<PopupCreateOrUpdatePlaylistComponent>,
               @Inject(MAT_DIALOG_DATA) public data,
               private messageService: MessageService) { }


    ngOnInit(): void
    {
        this.action = this.data.action;
        this.tabNomPlaylist = this.data.tabPlaylist.map( playlist0 => playlist0.name );
        if(this.action === "update") this.name = this.data.playlistName;
    }


    onValider(): void
    {
        this.checkError();
        if(!this.hasError)
        {
            if(this.action === "create")
            {
                this.messageService
                    .post("playlist/create", {name: this.name})
                    .subscribe(retour => this.onValiderCallback(retour), err => this.onValiderCallback(err));
            }
            else if(this.action === "update")
            {
                this.messageService
                    .put("playlist/update/"+this.data.playlistId, {name: this.name})
                    .subscribe(retour => this.onValiderCallback(retour), err => this.onValiderCallback(err));
            }
        }
    }


    onValiderCallback(retour): void
    {
        if(retour.status !== "success") {
            console.log(retour);
            this.dialogRef.close(null);
        }
        else {
            if(this.action === "create") this.dialogRef.close(retour.data);
            else if(this.action === "update") this.dialogRef.close(this.name);
        }
    }


    checkError(): void
    {
        if(this.name === "") {
            this.errorMessage = "Le nom ne peut pas être vide" ;
            this.hasError = true;
        }
        else if(this.tabNomPlaylist.includes(this.name)){
            this.errorMessage = "Ce nom est déjà utilisé" ;
            this.hasError = true;
        }
        else {
            this.hasError = false;
            this.errorMessage = "" ;
        }
    }


    onAnnuler(): void
    {
        this.dialogRef.close(null);
    }

}
