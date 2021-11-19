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
    video: VideoDB;
    tabPlaylistAndBool = [];
    goToCreatePlaylist = false;
    newPlaylistName = "";


    constructor( public dialogRef: MatDialogRef<PopupAddVideoToPlaylistsComponent>,
                 @Inject(MAT_DIALOG_DATA) public data,
                 private messageService: MessageService) { }


    ngOnInit(): void
    {
        this.video = this.data.video;
        for(let playlist of this.data.playlists)
        {
            playlist["isSelected"] = false;
            this.tabPlaylistAndBool.push(playlist);
        }
    }


    onValider(): void
    {
        const tabPlaylist = [];
        for(let playlist of this.tabPlaylistAndBool)
        {
            if(playlist.isSelected) {
                delete playlist["isSelected"];
                tabPlaylist.push(playlist);
            }
        }

        // --- FAUX CODE ---
        this.dialogRef.close("success");

        // --- VRAI CODE ---
        /*
        if(!this.goToCreatePlaylist) this.newPlaylistName = "";
        const data = { "video": this.video,  "playlists": tabPlaylist, "newPlaylistName": this.newPlaylistName };
        this.messageService
            .sendMessage("user/add/vidéo", data)
            .subscribe( retour => { this.dialogRef.close(retour.status) });
        */
    }


    onAnnuler(): void
    {
        this.dialogRef.close("annulation")
    }

}
