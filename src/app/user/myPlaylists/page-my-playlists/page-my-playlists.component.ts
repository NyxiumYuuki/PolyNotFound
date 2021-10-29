import { Component, OnInit } from '@angular/core';
import {ThemeService} from "../../../utils/services/theme/theme.service";
import {Advert} from "../../../utils/interfaces/advert";
import {FictitiousDatasService} from "../../../utils/services/fictitiousDatas/fictitious-datas.service";
import {MessageService} from "../../../utils/services/message/message.service";
import {Playlist} from "../../../utils/interfaces/playlist";


@Component({
    selector: 'app-page-my-playlists',
    templateUrl: './page-my-playlists.component.html',
    styleUrls: ['./page-my-playlists.component.scss']
})
export class PageMyPlaylistsComponent implements OnInit
{
    allPlaylists: Playlist[];   // toutes les playlists
    ad: Advert;                 // pub
    playlist: Playlist;         // la playlist sélectionnée


    constructor( public themeService: ThemeService,
                 private messageService: MessageService,
                 private fictitioousData: FictitiousDatasService ) { }


    ngOnInit(): void
    {
        // --- FAUX CODE ---
        this.allPlaylists = this.fictitioousData.getTabPlaylist(10, 10);
        this.ad = this.fictitioousData.getAdvert();

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

    transmitToVideoList(playlist: Playlist): void
    {
        this.playlist = playlist;
    }

}
