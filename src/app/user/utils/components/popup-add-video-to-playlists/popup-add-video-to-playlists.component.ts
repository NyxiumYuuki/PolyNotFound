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


    constructor( public dialogRef: MatDialogRef<PopupAddVideoToPlaylistsComponent>,
                 @Inject(MAT_DIALOG_DATA) public data,
                 private messageService: MessageService) { }


    ngOnInit(): void
    {
        this._idVideo = this.data._idVideo;
        this.videoId = this.data.videoId;
        this.source = this.data.source;
        this.interest = this.data.interest;

        console.log("_id: " + this._idVideo);
        console.log("videoId: " + this.videoId);
        console.log("source: " + this.source);
        console.log("interest: " + this.interest);

        for(let playlist of this.data.playlists)
        {
            playlist["isSelected"] = false;
            this.tabPlaylistAndBool.push(playlist);
        }
    }



    onValider(): void
    {
        // --- Existing playlists ---
        let listeDesPlaylists = "" ;
        for(let playlist of this.tabPlaylistAndBool)
        {
            if(playlist.isSelected) listeDesPlaylists += playlist.id + "," ;
        }
        if(listeDesPlaylists.endsWith(",")) listeDesPlaylists = listeDesPlaylists.slice(0, listeDesPlaylists.length-1);

        console.log(listeDesPlaylists);
        if(listeDesPlaylists !== "")
        {
            const data1 = { videoId: this._idVideo };
            this.messageService
                .put( "playlist/update/"+listeDesPlaylists, data1)
                .subscribe( ret => this.callbackForExistingPlaylists(ret), err => this.callbackForExistingPlaylists(err));
        }


        // --- New playlists ---
        if(this.goToCreatePlaylist)
        {
            const data2 = {
                name: this.newPlaylistName,
                video: {videoId: this.videoId, interest: this.interest, source: this.source}
            };
            this.messageService
                .post("playlist/create", data2)
                .subscribe( ret => this.callbackForNewPlaylist(ret), err => this.callbackForNewPlaylist(err));
        }
    }



    callbackForExistingPlaylists(retour: any): void
    {
        console.log("onValiderCallback");
        console.log(retour);

        if(retour.status !== "success") {
            //console.log(retour);
            this.dialogRef.close(null);
        }
    }



    callbackForNewPlaylist(retour: any): void
    {
        console.log("callbackForNewPlaylist");
        console.log(retour);

        if(retour.status !== "success") {
            console.log(retour);
            this.dialogRef.close(null);
        }
    }



    onAnnuler(): void
    {
        this.dialogRef.close("annulation");
    }

}
