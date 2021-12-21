import { Component, OnInit } from '@angular/core';
import {HttpParams} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {MessageService} from "../../../utils/message/message.service";
import {ThemeService} from "../../../utils/theme/theme.service";



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
    tabVideo: any[] = [];
    search: string = "";
    ad1: any;
    ad2: any;
    sources: string = "" ;
    indexPage: number = 0;


    constructor( private messageService: MessageService,
                 public themeService: ThemeService,
                 private activatedRoute: ActivatedRoute ) { }


    ngOnInit(): void
    {
        // parametre de la route
        this.activatedRoute
            .queryParams
            .subscribe(paramsFromOldPage => {
                if(paramsFromOldPage.hasOwnProperty("search")) this.search = paramsFromOldPage.search;
                if(paramsFromOldPage.hasOwnProperty("sources"))
                {
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
                if(paramsFromOldPage.hasOwnProperty("indexPage")) this.indexPage = parseInt(paramsFromOldPage.indexPage, 10);
                this.onSearch();
            });

        // Ask for ads
        let params = new HttpParams();
        params = params.append("quantity", 2);
        this.messageService
            .get("user/ad", params)
            .subscribe(ret => this.adCallback(ret), err => this.adCallback(err));
    }


    adCallback(retour: any): void
    {
        if(retour.status !== "success") {
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

        if(this.tabPlateform[0].isSelected && this.tabPlateform[1].isSelected) this.sources = "yt,dm" ;
        else if((!this.tabPlateform[0].isSelected) && this.tabPlateform[1].isSelected) this.sources = "dm" ;
        else if(this.tabPlateform[0].isSelected && (!this.tabPlateform[1].isSelected)) this.sources = "yt" ;
        else this.sources = "" ;
        params = params.append('sources', this.sources);

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
