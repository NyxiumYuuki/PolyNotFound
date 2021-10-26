import { Injectable } from '@angular/core';
import {MessageService} from "../message/message.service";
import {MatDialog} from "@angular/material/dialog";
import {PopupAddVideoToPlaylistsComponent} from "../../components/popup-add-video-to-playlists/popup-add-video-to-playlists.component";
import {FictitiousDatasService} from "../fictitiousDatas/fictitious-datas.service";
import {Video} from "../../interfaces/video";

@Injectable({
    providedIn: 'root'
})
export class PlaylistService
{

    constructor( private messageService: MessageService,
                 public dialog: MatDialog,
                 private fictitiousDatasService: FictitiousDatasService ) { }


    addVideoToPlaylists(video0: Video): void
    {
        // --- DONNEES FICTIVES ---
        const config = {
            width: '30%',
            data: {
                video: video0,
                playlists: this.fictitiousDatasService.getTabPlaylist()
            }
        }
        this.dialog
            .open(PopupAddVideoToPlaylistsComponent, config)
            .afterClosed()
            .subscribe(result => {});


        // --- VRAI CODE ---
        /*
        this.messageService
            .sendMessage('user/get/playlists', null)
            .subscribe( retour => {

                if(retour.status === "error") console.log(retour.data);
                else
                {
                    const config = {
                        width: '30%',
                        data: {
                            video: video0,
                            playlists: retour.data,
                        }
                    };
                    this.dialog
                        .open(PopupAddVideoToPlaylistsComponent, config )
                        .afterClosed()
                        .subscribe(result => {});
                }
            })
        */
    }

}
