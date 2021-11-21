import { Injectable } from '@angular/core';
import {MessageService} from "../../../../utils/services/message/message.service";
import {MatDialog} from "@angular/material/dialog";
import {PopupAddVideoToPlaylistsComponent} from "../../components/popup-add-video-to-playlists/popup-add-video-to-playlists.component";
import {VideoAll, VideoDB} from "../../../../utils/interfaces/video";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FictitiousVideosService} from "../../../../utils/services/fictitiousDatas/fictitiousVideos/fictitious-videos.service";



@Injectable({
    providedIn: 'root'
})
export class AddVideoToPlaylistsService
{
    private _video: VideoDB | VideoAll;


    constructor( private messageService: MessageService,
                 public dialog: MatDialog,
                 private fictitiousVideosService: FictitiousVideosService,
                 private snackBar: MatSnackBar ) { }


    // --- FAUX CODE ---
    run(video0: VideoDB | VideoAll): void
    {
        this._video = video0;
        const retour = {
            status: "success",
            data: this.fictitiousVideosService.getRandomTabPlaylistDB(4, 5),
        }
        this.afterReceivingPlaylists(retour)
    }


    // --- VRAI CODE ---
    /*
    run(video0: VideoDB): void
    {
        this._video = video0;
        this.messageService
            .sendMessage('user/get/playlists', null)
            .subscribe( retour => { this.afterReceivingPlaylists(retour) });
    }
    */


    private afterReceivingPlaylists(retour): void
    {
        if(retour.status === "error") console.log(retour.data);
        else
        {
            const config = {
                width: '30%',
                data: { video: this._video, playlists: retour.data }
            };
            this.dialog
                .open(PopupAddVideoToPlaylistsComponent, config )
                .afterClosed()
                .subscribe(retour => { this.afterClosingDialog(retour); });
        }
    }


    private afterClosingDialog(retour): void
    {
        let message = "" ;
        switch (retour)
        {
            case "error":
                message = "Echec de l'opération  ❌" ;
                break;
            case "success":
                message = "La vidéo a bien été ajoutée  ✔" ;
                break;
            case "annulation":
            case null:
            case undefined:
                message = "Opération annulée" ;
                break;
        }
        const config = { duration: 1000, panelClass: "custom-class" };
        this.snackBar.open( message, "", config);
    }

}
