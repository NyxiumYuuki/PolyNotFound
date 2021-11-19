import { Injectable } from '@angular/core';
import {VideoDB} from "../../../../utils/interfaces/video";
import {MessageService} from "../../../../utils/services/message/message.service";



@Injectable({
    providedIn: 'root'
})
export class UserHistoryService
{
    private tabVideoUrlClicked: string[] = [];


    constructor(private messageService: MessageService) { }


    public addVideoToHistoque(video: VideoDB): void
    {
        if (!this.tabVideoUrlClicked.includes(video.videoId))
        {
            this.tabVideoUrlClicked.push(video.videoId);
            video.watchedDates.push(new Date());

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
