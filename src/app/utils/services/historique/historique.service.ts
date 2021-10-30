import { Injectable } from '@angular/core';
import {Video} from "../../interfaces/video";
import {WatchedVideo} from "../../interfaces/watchedVideo";
import {MessageService} from "../message/message.service";

@Injectable({
    providedIn: 'root'
})
export class HistoriqueService
{
    private tabVideoUrlClicked: string[] = [];


    constructor(private messageService: MessageService) { }


    public addVideoToHistoque(video: Video): void
    {
        if (!this.tabVideoUrlClicked.includes(video.url))
        {
            this.tabVideoUrlClicked.push(video.url);

            const watchedVideo0: WatchedVideo = {
                _id: video._id,
                url: video.url,
                title: video.title,
                date: new Date()
            };
            console.log(watchedVideo0);

            this.addWatchedVideoToHistorique(watchedVideo0);
        }
    }


    public addWatchedVideoToHistorique(watchedVideo0: WatchedVideo): void
    {
        // --- VRAI CODE ---
        /*
        this.messageService
            .sendMessage("user/add/watchedVideo", {watchedVideo: watchedVideo0})
            .subscribe(retour => {});
        */
    }


    public clearTabVideoUrlClicked()
    {
        this.tabVideoUrlClicked = [];
    }

}
