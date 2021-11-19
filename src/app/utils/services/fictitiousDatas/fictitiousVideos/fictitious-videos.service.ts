import { Injectable } from '@angular/core';
import {VideoAll} from "../../../interfaces/video";
import {PlaylistDB} from "../../../interfaces/playlist";
import {FictitiousUtilsService} from "../fictitiousUtils/fictitious-utils.service";



const TAB_VIDEO: VideoAll[] = [
    {
        _id: "Mowgli",
        videoId: "https://www.youtube.com/watch?v=medPORJ8KO0",
        userId: "userId",
        source: "youtube",
        tags: [ "rap", "musique" ],
        watchedDates: [new Date()],
        createdAt: new Date(),
        updatedAt: new Date(),

        title: "PNL - Mowgli",
        views: 999999999,
        publishedAt: new Date(),
        imageUrl: "https://i.ytimg.com/vi/CaeH7TRnI3s/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCr4TMUqy_Lqi9_zh7efICrF_V_Vw",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit. "
    },
    {
        _id: "Mexico",
        videoId: "https://www.youtube.com/watch?v=LZx6oeNeoWM",
        userId: "userId",
        source: "youtube",
        tags: [ "rap", "musique" ],
        watchedDates: [new Date()],
        createdAt: new Date(),
        updatedAt: new Date(),

        title: "PNL - Mexico",
        views: 999999,
        publishedAt: new Date(),
        imageUrl: "https://i.ytimg.com/vi/LZx6oeNeoWM/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAIJsokYSLBB3TrnKhX5V1beCTrpQ",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit. "
    },
    {
        _id: "Luz de luna",
        videoId: "https://www.youtube.com/watch?v=fGoPhSV2Jic",
        userId: "userId",
        source: "youtube",
        tags: [ "rap", "musique" ],
        watchedDates: [new Date()],
        createdAt: new Date(),
        updatedAt: new Date(),

        title: "PNL - Luz de luna",
        views: 999999,
        publishedAt: new Date(),
        imageUrl: "https://i.ytimg.com/vi/fGoPhSV2Jic/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBICz3ZfnjAXQNZQniiCTRLbdyLcg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit. "
    },
    {
        _id: "Blanka",
        videoId: "https://www.youtube.com/watch?v=u8bHjdljyLw",
        userId: "userId",
        source: "youtube",
        tags: [ "rap", "musique" ],
        watchedDates: [new Date()],
        createdAt: new Date(),
        updatedAt: new Date(),

        title: "PNL - Blanka",
        views: 999999,
        publishedAt: new Date(),
        imageUrl: "https://i.ytimg.com/vi/PCwZnN4zDiY/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCaA-xe5rkkYJbNCbSg0z27Lm1Hgw",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit. "
    },
    {
        _id: "Mowgli 2",
        videoId: "https://www.dailymotion.com/video/x7ahxdn",
        userId: "userId",
        source: "dailymotion",
        tags: [ "rap", "musique" ],
        watchedDates: [new Date()],
        createdAt: new Date(),
        updatedAt: new Date(),

        title: "PNL - Mowgli 2",
        views: 999999,
        publishedAt: new Date(),
        imageUrl: "https://i.ytimg.com/vi/tno1qRfO894/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCOBBR6c3woXXIbOSdU06quQcN7pw",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit. "
    },
    {
        _id: "Etre humain",
        videoId: "https://www.youtube.com/watch?v=gfVo39B92Ow",
        userId: "userId",
        source: "youtube",
        tags: [ "rap", "musique" ],
        watchedDates: [new Date()],
        createdAt: new Date(),
        updatedAt: new Date(),

        title: "PNL - Etre humain",
        views: 999999,
        publishedAt: new Date(),
        imageUrl: "https://i.ytimg.com/vi/gfVo39B92Ow/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCPJpBqTYk5Nj3RSgase3GdbT7_Pg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit. "
    },
    {
        _id: "Humanoide",
        videoId: "https://www.youtube.com/watch?v=MiyIg__WNOw",
        userId: "userId",
        source: "youtube",
        tags: [ "rap", "musique" ],
        watchedDates: [new Date()],
        createdAt: new Date(),
        updatedAt: new Date(),

        title: "Nekfeu - Humanoide",
        views: 999999,
        publishedAt: new Date(),
        imageUrl: "https://i.ytimg.com/vi/MiyIg__WNOw/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDboAq0TRqXBFGgXdpOD_HOsRZucw",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit. ",
    },
    {
        _id: "Dernier soupir",
        videoId: "https://youtu.be/0GqjIF-4QQM?list=PLqeKQSn3LuAmpF-uIu39RIQRQkUzVol5l",
        userId: "userId",
        source: "youtube",
        tags: [ "rap", "musique" ],
        watchedDates: [new Date()],
        createdAt: new Date(),
        updatedAt: new Date(),

        title: "Nekfeu - Dernier soupir",
        views: 999999,
        publishedAt: new Date(),
        imageUrl: "https://i.ytimg.com/vi/-S5IKBvT34c/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLC1kVCIB2bQGmOH74I5puXIhn7HRQ",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit. ",
    },
    {
        _id: "Les prélis",
        videoId: "https://www.dailymotion.com/video/x4trtkd",
        userId: "userId",
        source: "youtube",
        tags: [ "rap", "musique" ],
        watchedDates: [new Date()],
        createdAt: new Date(),
        updatedAt: new Date(),

        title: "Columbine - Les prélis",
        views: 999999,
        publishedAt: new Date(),
        imageUrl: "https://i.ytimg.com/an_webp/LfFI3bzMLU0/mqdefault_6s.webp?du=3000&sqp=CKq33owG&rs=AOn4CLDZmaPGWwcuo9yUWJ-xOzA69r2Qrw",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit. ",
    },
    {
        _id: "Pierre feuille ciseau",
        videoId: "https://www.dailymotion.com/video/x6agl6i",
        userId: "userId",
        source: "dailymotion",
        tags: [ "rap", "musique" ],
        watchedDates: [new Date()],
        createdAt: new Date(),
        updatedAt: new Date(),

        title: "Columbine - Pierre feuille ciseau",
        views: 999999,
        publishedAt: new Date(),
        imageUrl: "https://i.ytimg.com/vi/tTo7CrPlbpI/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAhC5bWURH9R8Icdkv6LWRgsW2G-Q",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit. ",
    },
];



@Injectable({
    providedIn: 'root'
})
export class FictitiousVideosService
{

    constructor(private fictitiousUtilsService: FictitiousUtilsService) {}


    getVideoAll(): VideoAll
    {
        const index = Math.floor(Math.random() * TAB_VIDEO.length);
        return TAB_VIDEO[index];
        //return Object.assign({}, TAB_VIDEO[index]);
    }


    getTabVideoAll(nbVideo: number): VideoAll[]
    {
        let tabVideo = [];
        for(let i=0 ; i<nbVideo ; i++) tabVideo.push(this.getVideoAll());
        return tabVideo;
    }


    getTabPlaylistDB(nbPlaylist: number, nbVideoMax: number): PlaylistDB[]
    {
        let tabPlaylist: PlaylistDB[] = [];

        for (let i = 0; i < nbPlaylist; i++)
        {
            const r = Math.floor(Math.random() * nbVideoMax);
            const tabVideo = this.getTabVideoAll(r);
            tabPlaylist.push({
                _id: "id_playlist_"+i.toString(),
                userId: "userId",
                name: "playlist_"+i.toString(),
                videoIds: tabVideo.map(x => x._id),
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }

        return tabPlaylist;
    }


    getAllVideoAll(): VideoAll[]
    {
        return TAB_VIDEO;
    }

}
