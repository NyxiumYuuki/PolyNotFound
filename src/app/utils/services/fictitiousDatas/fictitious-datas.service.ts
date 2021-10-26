import { Injectable } from '@angular/core';
import {Video} from "../../interfaces/video";
import {Playlist} from "../../interfaces/playlist";

@Injectable({
    providedIn: 'root'
})
export class FictitiousDatasService
{
    constructor() { }


    load_pageSeach(n: number): Video[]
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


    getTabPlaylist()
    {
        let tabTabPlaylist: Playlist[] = [];

        for (let i = 0; i < 4; i++)
        {
            let playlist: Playlist = {
                _id: i.toString(),
                user: null,
                name: "name_"+i.toString(),
                count: 3,
                videos: []
            }
            tabTabPlaylist.push(playlist);
        }

        return tabTabPlaylist
    }

}
