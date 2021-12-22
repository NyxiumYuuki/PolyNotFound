import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AddVideoToPlaylistsService} from "../../utils/services/addVideoToPlaylists/add-video-to-playlists.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {HttpParams} from "@angular/common/http";
import {MessageService} from "../../../utils/message/message.service";
import {ThemeService} from "../../../utils/theme/theme.service";



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
    sources: string = "";
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

    ad1: any;
    ad2: any;
    from: string = "";

    playlist: any;
    videosInPlaylist: any[] = [];

    paramsFromOldPage ;

    hiddenDescription: boolean = true;
    iframeStyle: string = "";
    containerStyle: string = "";


    constructor( private messageService: MessageService,
                 public themeService: ThemeService,
                 private activatedRoute: ActivatedRoute,
                 private router: Router,
                 private _sanitizer: DomSanitizer,
                 private addVideoToPlaylistsService: AddVideoToPlaylistsService ) { }



    ngOnInit(): void
    {
        // Ask for videos
        this.activatedRoute
            .queryParams
            .subscribe(paramsFromOldPage => {

                this.paramsFromOldPage = paramsFromOldPage;
                const videoId = paramsFromOldPage.videoId;
                let source = paramsFromOldPage.source;

                let params = new HttpParams();
                if(source === "Youtube") source = "yt";
                else if(source === "Dailymotion") source = "dm" ;
                params = params.append("source", source);
                this.messageService
                    .get("video/get/"+videoId, params)
                    .subscribe(ret => this.findVideoCallback(ret), err => this.findVideoCallback(err));
            });


        // Ask for adverts
        let params = new HttpParams();
        params = params.append("quantity", 2);
        this.messageService
            .get("user/ad", params)
            .subscribe(ret => this.findAdCallback(ret), err => this.findAdCallback(err));


        // Si on vient de la page "search"
        if(this.router.url.includes("search"))
        {
            this.from = "search" ;
            this.activatedRoute
                .queryParams
                .subscribe(paramsFromOldPage => {
                    if(paramsFromOldPage.hasOwnProperty("search")) this.search = paramsFromOldPage.search;
                    if(paramsFromOldPage.hasOwnProperty("sources")) {
                        this.sources = paramsFromOldPage.sources;
                        if(this.sources === "yt") {
                            this.tabPlateform[0].isSelected = true;
                            this.tabPlateform[1].isSelected = false;
                        }
                        else if(this.sources === "dm") {
                            this.tabPlateform[0].isSelected = false;
                            this.tabPlateform[1].isSelected = true;
                        }
                        else if(this.sources === "yt,dm") {
                            this.tabPlateform[0].isSelected = true;
                            this.tabPlateform[1].isSelected = true;
                        }
                    }
                });
        }
        // si on vient de la page "myPlaylists"
        else if(this.router.url.includes("myPlaylists"))
        {
            this.from = "myPlaylists";
            this.activatedRoute
                .queryParams
                .subscribe(paramsFromOldPage => {
                    const _idPlaylist = paramsFromOldPage._idPlaylist;
                    this.messageService
                        .get("playlist/findOne/"+_idPlaylist)
                        .subscribe(ret => this.afterReceivingPlaylistWithVideo(ret), err => this.afterReceivingPlaylistWithVideo(err));
                });

        }
        // si on vient de la page "history"
        else if(this.router.url.includes("history")) this.from = "history";


        // style
        if(this.from === 'search' || this.from === 'history') {
            this.containerStyle = "margin: 0 auto; width: 64vw;" ;
            this.iframeStyle = "width: 64vw; height: 60vh;" ;
        }
        else {
            this.containerStyle = "margin: 0 auto; width: 48vw;" ;
            this.iframeStyle = "width: 48vw; height: 45vh;" ;
        }
    }



    findVideoCallback(retour: any): void
    {
        if(retour.status !== "success") {
            console.log("findVideoCallback: ");
            console.log(retour);
        }
        else {
            this.video = retour.data;
        }
    }


    findAdCallback(retour: any): void
    {
        if(retour.status !== "success") {
            console.log("findAdCallback: ");
            console.log(retour);
        }
        else {
            this.ad1 = retour.data[0];
            this.ad2 = retour.data[1];
        }
    }


    afterReceivingPlaylistWithVideo(retour: any): void
    {
        if(retour.status !== "success") {
            console.log("afterReceivingPlaylistWithVideo");
            console.log(retour);
        }
        else {
            this.playlist = retour.data;
            this.videosInPlaylist = retour.data.videos;
        }
    }


    onSearch()
    {
        if(this.tabPlateform[0].isSelected && this.tabPlateform[1].isSelected) this.sources = "yt,dm" ;
        else if((!this.tabPlateform[0].isSelected) && this.tabPlateform[1].isSelected) this.sources = "dm" ;
        else if(this.tabPlateform[0].isSelected && (!this.tabPlateform[1].isSelected)) this.sources = "yt" ;
        else this.sources = "" ;
        let options = {
            queryParams: {
                search: this.search,
                sources: this.sources,
                indexPage: 0,
            }
        };
        this.router.navigate(['/user/search'], options);
    }


    onAddToPlaylist(): void
    {
        this.addVideoToPlaylistsService.run(this.video.videoId, this.video.source, this.video.interest);
    }


    onRetour(): void
    {
        let url: string[] = [];
        let options = {};

        if(this.from === 'search')
        {
            url = ['/user/search'];
            options = {
                queryParams: {
                    search: this.paramsFromOldPage.search,
                    sources: this.paramsFromOldPage.sources,
                    indexPage: this.paramsFromOldPage.indexPage,
                }
            };
        }
        else if(this.from === 'myPlaylists') url = ["/user/myPlaylists"];
        else if(this.from === 'history') url = ["/user/history"];

        this.router.navigate(url, options);
    }


    safeUrl(videoId: string, source: string): SafeResourceUrl
    {
        let videoUrl = "" ;
        if(source === 'Youtube') videoUrl = "https://www.youtube.com/embed/" + videoId + "?autoplay=1";
        else if(source === 'Dailymotion') videoUrl = "https://www.dailymotion.com/embed/video/" + videoId + "?autoplay=true";
        return this._sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    }


    // retourne la classe CSS de videoCell
    getClassOfVideoCell(video0): string
    {
        if(video0 === this.video) return "videoCell videoCellFocus" ;
        else return "videoCell" ;
    }


    onEnterOnSearchBar(event)
    {
        if(event.key === 'Enter') this.onSearch();
    }


    playlistExists(): boolean
    {
        return ((this.playlist !== null) && (this.playlist !== undefined));
    }

}
