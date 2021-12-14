import { Component, OnInit } from '@angular/core';
import {MessageService} from "../../../utils/services/message/message.service";
import {VideoAll} from "../../../utils/interfaces/video";
import {ThemeService} from "../../../utils/services/theme/theme.service";
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
    ad1: any = { title: "", url: "", images: [] };
    ad2: any = { title: "", url: "", images: [] };


    constructor( private messageService: MessageService,
                 public themeService: ThemeService ) { }


    ngOnInit(): void
    {
        let params = new HttpParams();
        params = params.append("quantity", 2);
        this.messageService
            .get("user/ad", params)
            .subscribe(ret => this.adCallback(ret), err => this.adCallback(err));

        this.onSearch();
    }


    adCallback(retour: any): void
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
        let params = new HttpParams();
        params = params.append('q', this.search);

        let sources = "";
        if(this.tabPlateform[0].isSelected && this.tabPlateform[1].isSelected) sources += "yt,dm" ;
        else if((!this.tabPlateform[0].isSelected) && this.tabPlateform[1].isSelected) sources += "dm" ;
        else if(this.tabPlateform[0].isSelected && (!this.tabPlateform[1].isSelected)) sources += "yt" ;
        else sources += "" ;
        params = params.append('sources', sources);

        this.messageService
            .get("video/search", params)
            .subscribe(ret => this.onSearchCallback(ret), err => this.onSearchCallback(err));
    }


    onSearchCallback(retour: any): void
    {
        if(retour.status !== "success") {
            console.log(retour);
        }
        else {
            this.tabVideo = retour.data;
        }
    }


    onEnterOnSearchBar(event)
    {
        if(event.key === 'Enter') this.onSearch();
    }

}
