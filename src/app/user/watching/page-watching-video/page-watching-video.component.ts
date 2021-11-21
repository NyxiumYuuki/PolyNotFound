import { Component, OnInit } from '@angular/core';
import {VideoAll} from "../../../utils/interfaces/video";
import {Advert} from "../../../utils/interfaces/advert";
import {MessageService} from "../../../utils/services/message/message.service";
import {FictitiousVideosService} from "../../../utils/services/fictitiousDatas/fictitiousVideos/fictitious-videos.service";
import {FictitiousAdvertsService} from "../../../utils/services/fictitiousDatas/fictitiousAdverts/fictitious-adverts.service";
import {ThemeService} from "../../../utils/services/theme/theme.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AddVideoToPlaylistsService} from "../../utils/services/addVideoToPlaylists/add-video-to-playlists.service";
import {PlaylistDB} from "../../../utils/interfaces/playlist";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";



let TAB_PLATEFORM = [
    { name: "youtube", isSelected: false },
    { name: "dailymotion", isSelected: false }
];



@Component({
  selector: 'app-page-watching-video',
  templateUrl: './page-watching-video.component.html',
  styleUrls: ['./page-watching-video.component.scss']
})
export class PageWatchingVideoComponent implements OnInit
{
    tabPlateform = TAB_PLATEFORM;
    video: VideoAll;
    search: string = "";
    ad1: Advert;
    ad2: Advert;
    from: string = "";

    playlist: PlaylistDB;
    videosInPlaylist: VideoAll[] = [];

    hiddenDescription: boolean = true;
    iframeStyle: string = "";
    containerStyle: string = "";


    constructor( private messageService: MessageService,
                 private fictitiousVideosService: FictitiousVideosService,
                 private fictitiousAdvertsService: FictitiousAdvertsService,
                 public themeService: ThemeService,
                 private activatedRoute: ActivatedRoute,
                 private router: Router,
                 private _sanitizer: DomSanitizer,
                 private addVideoToPlaylistsService: AddVideoToPlaylistsService ) { }


    ngOnInit(): void
    {
        // --- FAUX CODE ---
        const videoId = this.activatedRoute.snapshot.paramMap.get('videoId');
        this.video =  this.fictitiousVideosService.getVideoByVideoId(videoId);
        this.ad1 = this.fictitiousAdvertsService.getAdvert();
        this.ad2 = this.fictitiousAdvertsService.getAdvert();

        if(this.router.url.includes("fromSearch")) this.from = "search" ;
        else if(this.router.url.includes("fromHistory")) this.from = "history";
        else if(this.router.url.includes("fromMyPlaylists"))
        {
            this.from = "myPlaylists";
            const _idPlaylist = this.activatedRoute.snapshot.paramMap.get('_idPlaylist');
            this.playlist = this.fictitiousVideosService.getPlaylistBy_id(_idPlaylist);
            const allVideo = this.fictitiousVideosService.getAllVideoAll();
            this.videosInPlaylist = [];
            for(let _idVideo of this.playlist.videoIds)
            {
                const video = allVideo.find(video => video._id === _idVideo);
                this.videosInPlaylist.push(video);
            }
        }

        if(this.from === 'search' || this.from === 'history')
        {
            this.containerStyle = "margin: 0 auto; width: 64vw;"
            this.iframeStyle = "width: 64vw; height: 60vh;" ;
        }
        else {
            this.containerStyle = "margin: 0 auto; width: 48vw;"
            this.iframeStyle = "width: 48vw; height: 45vh;" ;
        }

        // --- VRAI CODE ---
        // ...
    }


    onSearch()
    {

    }


    onAdd(): void
    {
        this.addVideoToPlaylistsService.run(this.video);
    }


    onRetour(): void
    {
        if(this.from === 'search') this.router.navigateByUrl("/user/search");
        else if(this.from === 'myPlaylists') this.router.navigateByUrl("/user/myPlaylists");
        else if(this.from === 'history') this.router.navigateByUrl("/user/history");
    }


    safeUrl(videoId: string, source: string): SafeResourceUrl
    {
        let videoUrl = "" ;
        if(source === 'youtube') videoUrl = "https://www.youtube.com/embed/" + videoId;
        else if(source === 'dailymotion') videoUrl = "https://www.dailymotion.com/embed/video/" + videoId;
        return this._sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    }
}
