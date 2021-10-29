import { Component, OnInit } from '@angular/core';
import {MessageService} from "../../../utils/services/message/message.service";
import {FictitiousDatasService} from "../../../utils/services/fictitiousDatas/fictitious-datas.service";
import {AddVideoToPlaylistsService} from "../../../utils/services/addVideoToPlaylists/add-video-to-playlists.service";
import {Video} from "../../../utils/interfaces/video";
import {Advert} from "../../../utils/interfaces/advert";
import {ThemeService} from "../../../utils/services/theme/theme.service";



let TAB_PLATEFORM = [
    { name: "Youtube", isSelected: false },
    { name: "Dailymotion", isSelected: false }
];



@Component({
    selector: 'app-page-search',
    templateUrl: './page-search.component.html',
    styleUrls: ['./page-search.component.scss']
})
export class PageSearchComponent implements OnInit
{
    tabPlateform = TAB_PLATEFORM;
    tabVideo: Video[] = [];
    search: string = "";
    ad1: Advert;
    ad2: Advert;


    constructor( private messageService: MessageService,
                 private fictitiousDatasService: FictitiousDatasService,
                 public themeService: ThemeService ) { }


    ngOnInit(): void
    {
        // --- FAUX CODE ---
        this.tabVideo = this.fictitiousDatasService.getTabVideo(11);
        this.ad1 = this.fictitiousDatasService.getAdvert();
        this.ad2 = this.fictitiousDatasService.getAdvert();

        // --- VRAI CODE ---
        /*
        let tabPlateformName = [];
        for(let plateform of this.tabPlateform) tabPlateformName.push(plateform.name);
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
        this.tabVideo = this.fictitiousDatasService.getTabVideo(4);

        // --- VRAI CODE ---
        /*
        let tabPlateformName = [];
        for(let plateform of this.tabPlateform)
        {
            if(plateform.isSelected) tabPlateformName.push(plateform.name);
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


    tiles = [
        {text: 'One', cols: 2, rows: 1, color: 'lightblue'},
        {text: 'Two', cols: 7, rows: 1, color: 'lightgreen'},
        {text: 'Three', cols: 2, rows: 1, color: 'lightpink'},
    ];

}
