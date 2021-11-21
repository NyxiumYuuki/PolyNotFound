import {Component, Input, OnInit} from '@angular/core';
import {Advert} from "../../../../utils/interfaces/advert";
import {ThemeService} from "../../../../utils/services/theme/theme.service";



@Component({
    selector: 'app-advert',
    templateUrl: './advert.component.html',
    styleUrls: ['./advert.component.scss']
})
export class AdvertComponent implements OnInit
{
    @Input() ad: Advert;
    @Input() from: string = "search";
    idxImage: number = 0;


    constructor(public themeService: ThemeService) { }


    ngOnInit(): void
    {
        const nbImages = this.ad.images.length;
        this.idxImage = Math.floor(Math.random() * nbImages);


    }

}
