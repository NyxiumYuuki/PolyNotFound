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
            if(playlist.videoIds.includes(this._idVideo)) playlist["isSelected"] = true;
            else playlist["isSelected"] = false;
            this.tabPlaylistAndBool.push(playlist);
        }
    }



    onValider(): void
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
