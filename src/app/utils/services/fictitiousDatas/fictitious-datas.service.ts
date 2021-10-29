import { Injectable } from '@angular/core';
import {Video} from "../../interfaces/video";
import {Playlist} from "../../interfaces/playlist";
import {Advert} from "../../interfaces/advert";

@Injectable({
    providedIn: 'root'
})
export class FictitiousDatasService
{
    constructor() { }


    getTabVideo(n: number): Video[]
    {
        let tabVideo = [];

        let url0 = "" ;
        for(let i=0 ; i<n ; i++)
        {
            if(i%3 === 0) url0 = "https://www.youtube.com/watch?v=medPORJ8KO0";
            else if(i%3 === 1) url0 = "https://youtu.be/medPORJ8KO0";
            else url0 = "https://www.dailymotion.com/video/x7ahxdn";
            const video: Video = {
                _id: i.toString(),
                url: url0,
                title: "video_" + i,
                description: "blablabla",
                views: 59,
            }
            tabVideo.push(video)
        }

        return tabVideo;
    }


    getTabPlaylist(n: number)
    {
        let tabTabPlaylist: Playlist[] = [];

        for (let i = 0; i < n; i++)
        {
            let playlist: Playlist = {
                _id: i.toString(),
                user: null,
                name: "playlist_"+i.toString(),
                count: 3,
                videos: []
            }
            tabTabPlaylist.push(playlist);
        }

        return tabTabPlaylist
    }


    getAdvert(): Advert
    {
        return {
            _id: "monId",
            advertiser: "nutella",
            images: [
                { url: "nutella_v_1.jpeg", description: "image nutella 1" },
                { url: "nutella_v_2.png", description: "image nutella 2" },
                { url: "nutella_v_3.jpg", description: "image nutella 3" }
            ],
            text: "Voici du bon nutella",
            subjectTarget: [],
            seen: 4,
            date: new Date(),
        }
    }

}
