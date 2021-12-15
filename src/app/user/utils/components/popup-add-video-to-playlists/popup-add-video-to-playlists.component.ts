import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MessageService} from "../../../../utils/services/message/message.service";



@Component({
    selector: 'app-popup-add-video-to-playlists',
    templateUrl: './popup-add-video-to-playlists.component.html',
    styleUrls: ['./popup-add-video-to-playlists.component.scss']
})
export class PopupAddVideoToPlaylistsComponent implements OnInit
{
    _idVideo: string = "";
    videoId: string = "";
    source: string = "";
    interest: string = "";

    tabPlaylistAndBool = [];

    goToCreatePlaylist = false;
    newPlaylistName = "";
    hasError: boolean = false;
    tabNomPlaylist: string[] = [];
    errorMessage: string = "" ;


    constructor( public dialogRef: MatDialogRef<PopupAddVideoToPlaylistsComponent>,
                 @Inject(MAT_DIALOG_DATA) public data,
                 private messageService: MessageService) { }


    ngOnInit(): void
    {
        this._idVideo = this.data._idVideo;
        this.videoId = this.data.videoId;
        this.source = this.data.source;
        this.interest = this.data.interest;

        for(let playlist of this.data.playlists)
        {
            if(playlist.videoIds.includes(this._idVideo)) playlist["isSelected"] = true;
            else playlist["isSelected"] = false;
            this.tabPlaylistAndBool.push(playlist);
            this.tabNomPlaylist.push(playlist.name);
        }
    }


    onValider(): void
    {
        this.checkError();
        if(!this.hasError)
        {
            // --- Existing playlists ---
            let listeDesPlaylistsSelected = "" ;
            let listeDesPlaylistsNotSelected = "" ;
            for(let playlist of this.tabPlaylistAndBool)
            {
                if(playlist.isSelected) listeDesPlaylistsSelected += playlist.id + "," ;
                else listeDesPlaylistsNotSelected += playlist.id + "," ;
            }
            if(listeDesPlaylistsSelected.endsWith(",")) listeDesPlaylistsSelected = listeDesPlaylistsSelected.slice(0, listeDesPlaylistsSelected.length-1);
            if(listeDesPlaylistsNotSelected.endsWith(",")) listeDesPlaylistsNotSelected = listeDesPlaylistsNotSelected.slice(0, listeDesPlaylistsNotSelected.length-1);

            if(listeDesPlaylistsSelected !== "")
            {
                const data1 = { videoId: { id: this._idVideo, action: "add" } };
                this.messageService
                    .put( "playlist/update/"+listeDesPlaylistsSelected, data1)
                    .subscribe( ret => this.callbackForExistingPlaylists(ret), err => this.callbackForExistingPlaylists(err));
            }
            if(listeDesPlaylistsNotSelected !== "")
            {
                const data2 = { videoId: { id: this._idVideo, action: "delete" } };
                this.messageService
                    .put( "playlist/update/"+listeDesPlaylistsNotSelected, data2)
                    .subscribe( ret => this.callbackForExistingPlaylists(ret), err => this.callbackForExistingPlaylists(err));
            }


            // --- New playlists ---
            if(this.goToCreatePlaylist)
            {
                const data3 = {
                    name: this.newPlaylistName,
                    video: {videoId: this.videoId, interest: this.interest, source: this.source}
                };
                this.messageService
                    .post("playlist/create", data3)
                    .subscribe( ret => this.callbackForNewPlaylist(ret), err => this.callbackForNewPlaylist(err));
            }


            // --- Finalement ---
            this.dialogRef.close("success");
        }
    }


    callbackForExistingPlaylists(retour: any): void
    {
        if(retour.status !== "success") {
            console.log(retour);
            this.dialogRef.close(null);
        }
    }


    callbackForNewPlaylist(retour: any): void
    {
        if(retour.status !== "success") {
            console.log(retour);
            this.dialogRef.close(null);
        }
    }


    onAnnuler(): void
    {
        this.dialogRef.close("annulation");
    }


    checkError(): void
    {
        if(this.goToCreatePlaylist && (this.newPlaylistName === "")) {
            this.errorMessage = "Le nom ne peut pas être vide" ;
            this.hasError = true;
        }
        else if(this.goToCreatePlaylist && this.tabNomPlaylist.includes(this.newPlaylistName)){
            this.errorMessage = "Ce nom est déjà utilisé" ;
            this.hasError = true;
        }
        else {
            this.hasError = false;
            this.errorMessage = "" ;
        }
    }

}
