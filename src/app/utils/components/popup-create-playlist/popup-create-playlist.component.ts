import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MessageService} from "../../services/message/message.service";
import {Playlist} from "../../interfaces/playlist";



@Component({
    selector: 'app-popup-create-playlist',
    templateUrl: './popup-create-playlist.component.html',
    styleUrls: ['./popup-create-playlist.component.scss']
})
export class PopupCreatePlaylistComponent implements OnInit
{
    name: string = "" ;
    hasError: boolean = false;
    tabNomPlaylist: string[] = [];
    errorMessage: string = "" ;


    constructor( public dialogRef: MatDialogRef<PopupCreatePlaylistComponent>,
               @Inject(MAT_DIALOG_DATA) public data,
               private messageService: MessageService) { }


    ngOnInit(): void
    {
        this.tabNomPlaylist = this.data.map( playlist0 => playlist0.name );
    }


    onValider(): void
    {
        // --- FAUX CODE ---
        //
        this.checkError();
        if(!this.hasError)
        {
            const playlist: Playlist = {
                _id: "monId",
                user: null,
                name: this.name,
                videos: [],
            };
            this.dialogRef.close(playlist);
        }

        // --- VRAI CODE ---
        /*
        this.checkError();
        if(!this.hasError)
        {
            this.messageService
                .sendMessage("user/create/playlist", {title: this.data.title})
                .subscribe(retour => {

                    if (retour.status === "error") {
                        console.log(retour);
                        this.dialogRef.close(null);
                    } else {
                        this.dialogRef.close(retour.data.playlist);
                    }
                });
        }
        */
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
        console.log("em:" + this.errorMessage);
    }


    onAnnuler(): void
    {
        this.dialogRef.close(null);
    }

}
