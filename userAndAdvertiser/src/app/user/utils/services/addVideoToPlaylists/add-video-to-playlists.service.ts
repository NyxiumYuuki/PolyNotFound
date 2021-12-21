import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {PopupAddVideoToPlaylistsComponent} from "../../components/popup-add-video-to-playlists/popup-add-video-to-playlists.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MessageService} from "../../../../utils/message/message.service";



@Injectable({
    providedIn: 'root'
})
export class AddVideoToPlaylistsService
{
    private _idVideo: string = "" ;
    private videoId: string = "" ;
    private source: string = "" ;
    private interest: string = "" ;


    constructor( private messageService: MessageService,
                 public dialog: MatDialog,
                 private snackBar: MatSnackBar ) { }


    run(videoId: string, source: string, interest: string): void
    {
        this.videoId = videoId;
        this.source = source;
        this.interest = interest;

        const data = { source: this.source, interest: this.interest };
        this.messageService
            .post("video/create/"+this.videoId, data)
            .subscribe(ret => this.afterCreatingVideo(ret), err => this.afterCreatingVideo(err));
    }


    private afterCreatingVideo(retour: any): void
    {
        if(retour.status !== "success") {
            console.log(retour);
        }
        else {
            this._idVideo = retour.data.id;
            this.messageService
                .get('playlist/findAll')
                .subscribe( ret => this.afterReceivingPlaylists(ret), ret => this.afterReceivingPlaylists(ret) );
        }
    }



    private afterReceivingPlaylists(retour: any): void
    {
        if(retour.status !== "success") {
            console.log(retour);
        }
        else
        {
            const config = {
                width: '30%',
                data: {
                    _idVideo: this._idVideo,
                    videoId: this.videoId,
                    source: this.source,
                    interest: this.interest,
                    playlists: retour.data.filter(x => x.isActive === true)
                }
            };
            this.dialog
                .open(PopupAddVideoToPlaylistsComponent, config)
                .afterClosed()
                .subscribe(retour => this.afterClosingDialog(retour));
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