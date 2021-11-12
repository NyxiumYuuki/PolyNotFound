import { Injectable } from '@angular/core';
import {Video} from "../../interfaces/video";
import {MessageService} from "../message/message.service";

@Injectable({
    providedIn: 'root'
})
export class UserHistoryService
{
    private tabVideoUrlClicked: string[] = [];


    constructor(private messageService: MessageService) { }


    public addVideoToHistoque(video: Video): void
    {
        if (!this.tabVideoUrlClicked.includes(video.url))
        {
            this.tabVideoUrlClicked.push(video.url);
            video.watched.push(new Date());

            // --- VRAI CODE ---
            /*
            this.messageService
                .sendMessage("user/add/watchedVideo", {watchedVideo: watchedVideo0})
                .subscribe(retour => {});
            */
        }
    }


    public clearTabVideoUrlClicked()
    {
        this.tabVideoUrlClicked = [];
    }

}
