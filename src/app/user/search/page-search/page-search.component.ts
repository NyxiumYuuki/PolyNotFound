import { Component, OnInit } from '@angular/core';
import {MessageService} from "../../../utils/services/message/message.service";
import {VideoAll} from "../../../utils/interfaces/video";
import {Advert} from "../../../utils/interfaces/advert";
import {ThemeService} from "../../../utils/services/theme/theme.service";
import {FictitiousVideosService} from "../../../utils/services/fictitiousDatas/fictitiousVideos/fictitious-videos.service";
import {FictitiousAdvertsService} from "../../../utils/services/fictitiousDatas/fictitiousAdverts/fictitious-adverts.service";
import {HttpParams} from "@angular/common/http";



let TAB_PLATEFORM = [
    { name: "Youtube", isSelected: true },
    { name: "Dailymotion", isSelected: true }
];



@Component({
    selector: 'app-page-search',
    templateUrl: './page-search.component.html',
    styleUrls: ['./page-search.component.scss']
})
export class PageSearchComponent implements OnInit
{
    tabPlateform = TAB_PLATEFORM;
    tabVideo: VideoAll[] = [];
    search: string = "";
    ad1: Advert;
    ad2: Advert;


    constructor( private messageService: MessageService,
                 private fictitiousVideosService: FictitiousVideosService,
                 private fictitiousAdvertsService: FictitiousAdvertsService,
                 public themeService: ThemeService ) { }


    ngOnInit(): void
    {
        // --- FAUX CODE ---
        //this.tabVideo = this.fictitiousVideosService.getTabVideoAll(90);
        this.ad1 = this.fictitiousAdvertsService.getAdvert();
        this.ad2 = this.fictitiousAdvertsService.getAdvert();
        this.onSearch();
    }



    onSearch()
    {
        let params = new HttpParams();
        params = params.append('q', this.search);

        let sources = "";
        if(this.tabPlateform[0].isSelected && this.tabPlateform[1].isSelected) sources += "yt,dm" ;
        else if((!this.tabPlateform[0].isSelected) && this.tabPlateform[1].isSelected) sources += "dm" ;
        else if(this.tabPlateform[0].isSelected && (!this.tabPlateform[1].isSelected)) sources += "yt" ;
        else sources += "" ;
        console.log(sources);
        params = params.append('sources', sources);

        this.messageService
            .get("video/search", params)
            .subscribe(ret => this.onSearchCallback(ret), err => this.onSearchCallback(err));
    }


    onSearchCallback(retour: any): void
    {
        console.log("ngOnInitCallback:");
        console.log(retour);

        if(retour.status !== "success") {
            //console.log(retour);
        }
        else {
            this.tabVideo = retour.data;
        }
    }

}
