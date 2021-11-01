import { Injectable } from '@angular/core';
import {Video} from "../../interfaces/video";
import {Playlist} from "../../interfaces/playlist";
import {Advert} from "../../interfaces/advert";
import {WatchedVideo} from "../../interfaces/watchedVideo";
import {User} from "../../interfaces/user";



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



const TAB_ADVERT = [
    {
        _id: "idNutella",
        title: "pot de nutella XXL",
        advertiser: "nutella",
        images: [
            { url: "nutella_v_1.jpeg", description: "image nutella 1" },
            { url: "nutella_v_2.png", description: "image nutella 2" },
            { url: "nutella_v_3.jpg", description: "image nutella 3" }
        ],
        tags: [ "bon", "petit-déjeuner", "chocolat" ],
        comment: "pub pour vacances de noêl",
        views: 5,
        createdAt: new Date(),
        lastUpdate: new Date(),
        isVisible: true
    },
    {
        _id: "idRolex",
        title: "Rolex",
        advertiser: "rolex",
        images: [
            { url: "rolex_v_1.jpg", description: "rolex 1" },
            { url: "rolex_v_2.png", description: "rolex 2" },
        ],
        tags: [ "montre", "luxe", "suisse" ],
        comment: "pub pour cette année",
        views: 2,
        createdAt: new Date(),
        lastUpdate: new Date(),
        isVisible: true
    },
]




@Injectable({
    providedIn: 'root'
})
export class FictitiousDatasService
{

    private makeid(length)
    {
        let res = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for( let i = 0; i < length; i++ )
        {
            const k = Math.floor(Math.random() * characters.length);
            res += characters.charAt(k);
        }
        return res;
    }


    getVideo(): Video
    {
        const idx = Math.floor(Math.random() * TAB_VIDEO.length);
        let video = Object.assign({}, TAB_VIDEO[idx]);
        video._id = video._id + this.makeid(5);
        return video;
    }

    getTabVideo(n: number): Video[]
    {
        let tabVideo = [];
        for(let i=0 ; i<n ; i++) tabVideo.push(this.getVideo());
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
        const idx = Math.floor(Math.random() * TAB_ADVERT.length);
        let advert = Object.assign({}, TAB_ADVERT[idx]);
        advert._id = advert._id + this.makeid(5);
        advert.tags = advert.tags.slice();
        advert.isVisible = (Math.random() < 0.5);
        return advert;
    }

    getTabAdvert(n: number): Advert[]
    {
        let tabAdvert = [];
        for(let i=0 ; i<n ; i++) tabAdvert.push(this.getAdvert());
        return tabAdvert;
    }


    getWatchedVideo(): WatchedVideo
    {
        const idx = Math.floor(Math.random() * TAB_VIDEO.length);
        const video: Video = TAB_VIDEO[idx];
        const watchedVideo: WatchedVideo = {
            _id: video._id,
            url: video.url,
            title: video.title,
            date: new Date()
        };
        return watchedVideo ;
    }

    getTabWatchedVideo(n: number): WatchedVideo[]
    {
        let tabWatchedVideo = [];
        for(let i=0 ; i<n ; i++) tabWatchedVideo.push(this.getWatchedVideo());
        return tabWatchedVideo;
    }


    getUser(): User
    {
        return {
            _id: "ririId",
            login: "Riri",
            hashPass: "agourgroou",
            mail: "riri@gmail.com",
            role: "user",
            profilePictureUrl: "https://www.figurines-goodies.com/1185-thickbox_default/huey-duck-tales-disney-funko-pop.jpg"
        }
    }

    getAdvertiser(): User
    {
        return {
            _id: "fifiId",
            login: "Fifi",
            hashPass: "agourgroou",
            mail: "fifi@gmail.com",
            role: "advertiser",
            profilePictureUrl: "https://www.figurines-goodies.com/1188-large_default/dewey-duck-tales-disney-funko-pop.jpg"
        }
    }

    getAdmin(): User
    {
        return {
            _id: "loulouId",
            login: "Loulou",
            hashPass: "agourgroou",
            mail: "loulou@gmail.com",
            role: "advertiser",
            profilePictureUrl: "https://www.reference-gaming.com/assets/media/product/41195/figurine-pop-duck-tales-n-309-loulou.jpg?format=product-cover-large&k=1519639530"
        }
    }


    getTags(): string[]
    {
        return [ "musique", "rap", "rock", "sport", "foot", "basket", "tennis", "film", "action", "aventure", "horreur", "romance", "comedie"];
    }

}
