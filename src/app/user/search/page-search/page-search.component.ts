import { Component, OnInit } from '@angular/core';
import {MessageService} from "../../../utils/services/message/message.service";
import {VideoAll} from "../../../utils/interfaces/video";
import {Advert} from "../../../utils/interfaces/advert";
import {ThemeService} from "../../../utils/services/theme/theme.service";
import {FictitiousVideosService} from "../../../utils/services/fictitiousDatas/fictitiousVideos/fictitious-videos.service";
import {FictitiousAdvertsService} from "../../../utils/services/fictitiousDatas/fictitiousAdverts/fictitious-adverts.service";



let TAB_PLATEFORM = [
    { name: "youtube", isSelected: false },
    { name: "dailymotion", isSelected: false }
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
        this.tabVideo = this.fictitiousVideosService.getTabVideoAll(90);
        this.ad1 = this.fictitiousAdvertsService.getAdvert();
        this.ad2 = this.fictitiousAdvertsService.getAdvert();

        // --- VRAI CODE ---
        /*
        let tabPlateformName = [];
        for(let plateform of this.tabPlateform) tabPlateformName.push(plateform.title);
        let data = { search: "", plaateforms: tabPlateformName };
        this.messageService
            .sendMessage("user/searchVideo", data)
            .subscribe( retour => {
                if(retour.status === "error") console.log(retour.data);
                else {
                    this.tabVideo = retour.data.videos;
                    this.ad1 = retour.data.ad1;
                    this.ad2 = retour.data.ad2;
                }
            });
        */
    }


    onSearch()
    {
        // --- FAUX CODE ---
        this.tabVideo = this.fictitiousVideosService.getTabVideoAll(2);

        // --- VRAI CODE ---
        /*
        let tabPlateformName = [];
        for(let plateform of this.tabPlateform)
        {
            if(plateform.isSelected) tabPlateformName.push(plateform.title);
        }
        let data = { "search": this.search, "plateforms": tabPlateformName };
        this.messageService
            .sendMessage("user/searchVideo", data)
            .subscribe(retour => {
                if(retour.status === "error") console.log(retour.data);
                else {
                    this.tabVideo = retour.data.videos;
                    this.ad1 = retour.data.ad1;
                    this.ad2 = retour.data.ad2;
                }
            });
        */
    }

}
