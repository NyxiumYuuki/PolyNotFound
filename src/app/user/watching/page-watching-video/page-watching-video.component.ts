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
import {HttpParams} from "@angular/common/http";



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
    video = {
        title: "",
        videoId: "",
        views: 0,
        publishedAt: null,
        description: "",
        source: "",
        interest: ""
    };
    search: string = "";
    ad1: any = { title: "", url: "", images: [] };
    ad2: any = { title: "", url: "", images: [] };
    from: string = "";

    playlist: PlaylistDB;
    videosInPlaylist: any[] = [];

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
        // Ask for videos
        const videoId = this.activatedRoute.snapshot.paramMap.get('videoId');
        let params1 = new HttpParams();
        let source = "" ;
        if(this.activatedRoute.snapshot.paramMap.get('source') === "Youtube") source = "yt" ;
        else source = "dm"
        params1 = params1.append("source", source);
        this.messageService
            .get("video/get/"+videoId, params1)
            .subscribe(ret => this.findVideoCallback(ret), err => this.findVideoCallback(err));

        // Ask for adverts
        let params2 = new HttpParams();
        params2 = params2.append("quantity", 2);
        this.messageService
            .get("user/ad", params2)
            .subscribe(ret => this.findAdCallback(ret), err => this.findAdCallback(err));


        if(this.router.url.includes("fromSearch")) this.from = "search" ;
        else if(this.router.url.includes("fromHistory")) this.from = "history";
        else if(this.router.url.includes("fromMyPlaylists"))
        {
            this.from = "myPlaylists";
            const _idPlaylist = this.activatedRoute.snapshot.paramMap.get('_idPlaylist');
            this.playlist = this.fictitiousVideosService.getPlaylistBy_id(_idPlaylist);
            const allVideo = this.fictitiousVideosService.get_TAB_VIDEO();
            this.videosInPlaylist = [];
            for(let _idVideo of this.playlist.videoIds)
            {
                const video = allVideo.find(video => video._id === _idVideo);
                this.videosInPlaylist.push(video);
            }
        }

        // style
        if(this.from === 'search' || this.from === 'history')
        {
            this.containerStyle = "margin: 0 auto; width: 64vw;"
            this.iframeStyle = "width: 64vw; height: 60vh;" ;
        }
        else {
            this.containerStyle = "margin: 0 auto; width: 48vw;"
            this.iframeStyle = "width: 48vw; height: 45vh;" ;
        }
    }


    findVideoCallback(retour: any): void
    {
        if(retour.status !== "success") {
            console.log(retour);
        }
        else {
            this.video = retour.data;
        }
    }


    findAdCallback(retour: any): void
    {
        if(retour !== "success") {
            console.log(retour);
        }
        else {
            this.ad1 = retour.data[0];
            this.ad2 = retour.data[1];
        }
    }


    onSearch()
    {

    }


    onAddToPlaylist(): void
    {
        this.addVideoToPlaylistsService.run(this.video.videoId, this.video.source, this.video.interest);
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
        if(source === 'Youtube') videoUrl = "https://www.youtube.com/embed/" + videoId + "?autoplay=1";
        else if(source === 'Dailymotion') videoUrl = "https://www.dailymotion.com/embed/video/" + videoId + "?autoplay=true";
        return this._sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    }


    // retourne la classe CSS de videoCell
    getClassOfVideoCell(video0: VideoAll): string
    {
        if(video0 === this.video) return "videoCell videoCellFocus" ;
        else return "videoCell" ;
    }


    onEnterOnSearchBar(event)
    {
        if(event.key === 'Enter') this.onSearch();
    }

}
