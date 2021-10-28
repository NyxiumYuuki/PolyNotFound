import { Component, OnInit } from '@angular/core';
import {MessageService} from "../../../utils/services/message/message.service";
import {FictitiousDatasService} from "../../../utils/services/fictitiousDatas/fictitious-datas.service";
import {AddVideoToPlaylistsService} from "../../../utils/services/addVideoToPlaylists/add-video-to-playlists.service";
import {Video} from "../../../utils/interfaces/video";



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


    constructor( private messageService: MessageService,
                 private fictitiousDatasService: FictitiousDatasService) { }


    ngOnInit(): void
    {
        // --- FAUX CODE ---
        this.tabVideo = this.fictitiousDatasService.getTabVideo(7);


        // --- VRAI CODE ---
        /*
        let tabPlateformName = [];
        for(let plateform of this.tabPlateform) tabPlateformName.push(plateform.name);
        let data = { search: "", plaateforms: tabPlateformName };
        this.messageService
            .sendMessage("user/searchVideo", data)
            .subscribe(retour => {
                if(retour.status === "error") console.log(retour.data);
                else this.tabVideo = retour.data;
            });
        */
    }


    onSearch()
    {
        // --- FAUX CODE ---
        this.tabVideo = [];
            //this.fictitiousDatasService.getTabVideo(4);


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
                else this.tabVideo = retour.data;
            });
        */
    }

}
