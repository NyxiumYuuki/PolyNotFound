import { Component, OnInit } from '@angular/core';
import {ThemeService} from "../../../utils/services/theme/theme.service";
import {Advert} from "../../../utils/interfaces/advert";
import {MessageService} from "../../../utils/services/message/message.service";
import {PlaylistDB} from "../../../utils/interfaces/playlist";
import {FictitiousAdvertsService} from "../../../utils/services/fictitiousDatas/fictitiousAdverts/fictitious-adverts.service";



@Component({
    selector: 'app-page-my-playlists',
    templateUrl: './page-my-playlists.component.html',
    styleUrls: ['./page-my-playlists.component.scss']
})
export class PageMyPlaylistsComponent implements OnInit
{
    ad: Advert;                 // pub
    playlist: PlaylistDB;         // la playlist sélectionnée


    constructor( public themeService: ThemeService,
                 private messageService: MessageService,
                 private fictitiousAdvertsService: FictitiousAdvertsService ) { }


    ngOnInit(): void
    {
        // --- FAUX CODE ---
        this.ad = this.fictitiousAdvertsService.getAdvert();

        // --- VRAI CODE ---
        /*
        this.messageService
            .sendMessage("user/get/playlists", null)
            .subscribe( retour => {

                if(retour.status === "error") console.log(retour.data);
                else {
                    this.tabPlaylists = retour.data.playlists;
                    this.ad = retour.data.ad;
                }
            })
        */
    }

    transmitToVideoList(playlist: PlaylistDB): void
    {
        this.playlist = playlist;
    }

}
