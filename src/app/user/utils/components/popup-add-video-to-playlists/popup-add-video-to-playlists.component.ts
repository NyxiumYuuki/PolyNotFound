import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {VideoDB} from "../../../../utils/interfaces/video";
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

    isFinishedForExistingPlaylist: boolean = false;
    isFinishedForNewPlaylist: boolean = false;



    constructor( public dialogRef: MatDialogRef<PopupAddVideoToPlaylistsComponent>,
                 @Inject(MAT_DIALOG_DATA) public data,
                 private messageService: MessageService) { }


    ngOnInit(): void
    {
        this._idVideo = this.data._idVideo;
        this.videoId = this.data.videoId;
        this.source = this.data.source;
        this.interest = this.data.interest;

        console.log("---");
        console.log(this.data._idVideo);
        console.log(this.data.videoId);
        console.log(this.data.source);
        console.log(this.data.interest);
        console.log("---");

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
        for(let playlist of this.tabPlaylistAndBool) listeDesPlaylists += playlist.id + ","
        if(listeDesPlaylists.endsWith(",")) listeDesPlaylists = listeDesPlaylists.slice(0, listeDesPlaylists.length-1);

        console.log(listeDesPlaylists);
        const data1 = { videoId: this._idVideo }
        this.messageService
            .put( "playlist/update/"+ listeDesPlaylists, data1)
            .subscribe( ret => this.callbackForExistingPlaylists(ret), err => this.callbackForExistingPlaylists(err));


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
        else {
            this.isFinishedForNewPlaylist = true;
        }


        // Attente active
        while((!this.isFinishedForExistingPlaylist) || (!this.isFinishedForNewPlaylist)) {}
        this.dialogRef.close("success");
    }



    callbackForExistingPlaylists(retour: any): void
    {
        console.log("onValiderCallback");
        //console.log(retour);

        if(retour.status !== "success") {
            console.log(retour);
            this.dialogRef.close(null);
        }
        else {
            this.isFinishedForExistingPlaylist = true;
            console.log("isFinishedForExistingPlaylist: true");
        }
    }



    callbackForNewPlaylist(retour: any): void
    {
        console.log("callbackForNewPlaylist");

        if(retour.status !== "success") {
            //console.log(retour);
            this.dialogRef.close(null);
        }
        else {
            this.isFinishedForNewPlaylist = true;
            console.log("isFinishedForNewPlaylist: true");
        }
    }



    onAnnuler(): void
    {
        this.dialogRef.close("annulation");
    }


    /*

    //nbPlaylistSelected: number = 0;
    //numPlaylistSelected: number = 0;

    onValider(): void
    {
        for(let playlist of this.tabPlaylistAndBool)
        {
            if(playlist.isSelected) this.nbPlaylistSelected += 1;
        }

        for(let playlist of this.tabPlaylistAndBool)
        {
            if(playlist.isSelected)
            {
                playlist.videoIds.push(this._idVideo);
                this.messageService
                    .put("playlist/update/"+playlist._id, playlist.videoIds)
                    .subscribe(ret => this.onAddingToExistingPlaylist(ret), err => this.onAddingToExistingPlaylist(err));
            }
        }
    }

    onAddingToExistingPlaylist(retour: any): void
    {
        console.log("onValiderCallback");
        console.log(retour);
        this.numPlaylistSelected += 1;

        if(retour.status !== "success") {
            this.dialogRef.close("annulation");
        }
        else {
            if(this.numPlaylistSelected === this.numPlaylistSelected)
            {
                this.dialogRef.close("success");
            }
        }
    }
    */



}
