import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';



@Component({
    selector: 'app-advert',
    templateUrl: './advert.component.html',
    styleUrls: ['./advert.component.scss']
})
export class AdvertComponent implements OnChanges
{
    @Input() ad: any;
    @Input() from: string = "search";
    image: any;
    imageExist: boolean = false;


    constructor() { }


    ngOnChanges(changes: SimpleChanges): void
    {
        if((this.ad !== null) && (this.ad !== undefined))
        {
            const nbImages = this.ad.images.length;
            const indexImage = Math.floor(Math.random() * nbImages);
            this.image = this.ad.images[indexImage];
            this.imageExist = true;
        }
    }


    onClick(): void
    {
        if((this.ad.url !== "") && (this.ad.url !== null) && (this.ad.url !== undefined)) {
            document.location.href = this.ad.url;
        }
    }

}
