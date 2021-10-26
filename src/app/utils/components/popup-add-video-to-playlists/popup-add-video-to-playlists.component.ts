import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Video} from "../../interfaces/video";

@Component({
    selector: 'app-popup-add-video-to-playlists',
    templateUrl: './popup-add-video-to-playlists.component.html',
    styleUrls: ['./popup-add-video-to-playlists.component.scss']
})
export class PopupAddVideoToPlaylistsComponent implements OnInit
{
    video: Video;
    tabPlaylistAndBool = [];
    goToCreatePlaylist = false;
    newPlaylistName = "";

    constructor( public dialogRef: MatDialogRef<PopupAddVideoToPlaylistsComponent>,
                 @Inject(MAT_DIALOG_DATA) public data ) { }


    ngOnInit(): void
    {
        this.video = this.data.video;
        const tabPlaylist = this.data.playlists;
        for(let playlist of tabPlaylist)
        {
            playlist["isSelected"] = false;
            this.tabPlaylistAndBool.push(playlist);
        }
    }

    onValider(): void
    {

    }
}
