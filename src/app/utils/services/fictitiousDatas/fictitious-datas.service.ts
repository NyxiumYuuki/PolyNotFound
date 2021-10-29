import { Injectable } from '@angular/core';
import {Video} from "../../interfaces/video";
import {Playlist} from "../../interfaces/playlist";
import {Advert} from "../../interfaces/advert";



const TAB_VIDEO = [
    {
        _id: "Mowgli",
        url: "https://www.youtube.com/watch?v=medPORJ8KO0",
        title: "PNL - Mowgli",
        description: "dans l'album Que la famille",
        views: 11,
    },
    {
        _id: "Mexico",
        url: "https://www.youtube.com/watch?v=LZx6oeNeoWM",
        title: "PNL - Mexico",
        description: "dans l'album Monde chico",
        views: 22,
    },
    {
        _id: "Luz de luna",
        url: "https://www.youtube.com/watch?v=fGoPhSV2Jic",
        title: "PNL - Luz de luna",
        description: "dans l'album Dans la legende",
        views: 33,
    },
    {
        _id: "Blanka",
        url: "https://www.youtube.com/watch?v=u8bHjdljyLw",
        title: "PNL - Blanka",
        description: "dans l'album Deux frères",
        views: 44,
    },
    {
        _id: "Mowgli 2",
        url: "https://www.dailymotion.com/video/x7ahxdn",
        title: "PNL - Mowgli",
        description: "exclu",
        views: 55,
    },
    {
        _id: "Etre humain",
        url: "https://www.youtube.com/watch?v=gfVo39B92Ow",
        title: "Nekfeu - Etre humain",
        description: "dans l'album feu",
        views: 66,
    },
    {
        _id: "Humanoide",
        url: "https://www.youtube.com/watch?v=MiyIg__WNOw",
        title: "Nekfeu - Humanoide",
        description: "dans l'album Cyborg",
        views: 77,
    },
    {
        _id: "Dernier soupir",
        url: "https://youtu.be/0GqjIF-4QQM?list=PLqeKQSn3LuAmpF-uIu39RIQRQkUzVol5l",
        title: "Nekfeu - Dernier soupir",
        description: "dans l'album Les etoiles vagabondes",
        views: 88,
    },
    {
        _id: "Dernier soupir",
        url: "https://youtu.be/0GqjIF-4QQM?list=PLqeKQSn3LuAmpF-uIu39RIQRQkUzVol5l",
        title: "Nekfeu - Dernier soupir",
        description: "dans l'album Les etoiles vagabondes",
        views: 99,
    },
    {
        _id: "Les prélis",
        url: "https://www.dailymotion.com/video/x4trtkd",
        title: "Columbine - Les prélis",
        description: "dans l'album Enfant terrible",
        views: 100,
    },
    {
        _id: "Pierre feuille ciseau",
        url: "https://www.dailymotion.com/video/x6agl6i",
        title: "Columbine - Pierre feuille ciseau",
        description: "exclu",
        views: 111,
    },
]


@Injectable({
    providedIn: 'root'
})
export class FictitiousDatasService
{
    constructor() { }


    getTabVideo(n: number): Video[]
    {
        let tabVideo = [];
        const l = TAB_VIDEO.length;

        for(let i=0 ; i<n ; i++)
        {
            const idx = Math.floor(Math.random() * l);
            tabVideo.push(TAB_VIDEO[idx]);
        }

        return tabVideo;
    }


    getTabPlaylist(nbPlaylist: number, nbVideoMax: number)
    {
        let tabTabPlaylist: Playlist[] = [];

        for (let i = 0; i < nbPlaylist; i++)
        {
            let playlist: Playlist = {
                _id: i.toString(),
                user: null,
                name: "playlist_"+i.toString(),
                videos: this.getTabVideo(Math.floor(Math.random() * nbVideoMax))
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
