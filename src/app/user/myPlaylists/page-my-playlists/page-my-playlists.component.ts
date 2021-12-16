import { Component, OnInit } from '@angular/core';
import {ThemeService} from "../../../utils/services/theme/theme.service";
import {Advert} from "../../../utils/interfaces/advert";
import {MessageService} from "../../../utils/services/message/message.service";
import {HttpParams} from "@angular/common/http";



@Component({
    selector: 'app-page-my-playlists',
    templateUrl: './page-my-playlists.component.html',
    styleUrls: ['./page-my-playlists.component.scss']
})
export class PageMyPlaylistsComponent implements OnInit
{
    ad: Advert;             // pub
    playlist: any;   // la playlist sélectionnée


    constructor( public themeService: ThemeService,
                 private messageService: MessageService ) { }


    ngOnInit(): void
    {
        let params = new HttpParams();
        params = params.append("quantity", 1);
        this.messageService
            .get("user/ad", params)
            .subscribe(ret => this.adCallback(ret), err => this.adCallback(err));
    }


    adCallback(retour: any): void
    {
        if(retour.status !== "success") {
            console.log(retour);
        }
        else {
            this.ad = retour.data[0];
        }
    }


    transmitPlaylistToVideoList(playlist): void
    {
        if ((playlist === null) || (playlist === undefined)) {
            this.playlist = playlist;
        }
        else {
            this.messageService
                .get("playlist/findOne/" + playlist.id)
                .subscribe(ret => this.afterReceivingPlaylistWithVideo(ret, playlist), err => this.afterReceivingPlaylistWithVideo(err, playlist));
        }
    }


    afterReceivingPlaylistWithVideo(retour: any, playlist): void
    {
        if(retour.status !== "success") {
            console.log(retour);
            this.playlist = playlist;
        }
        else {
            this.playlist = retour.data;
        }
    }

}
