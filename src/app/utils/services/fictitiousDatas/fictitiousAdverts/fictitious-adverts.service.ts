import { Injectable } from '@angular/core';
import {Advert} from "../../../interfaces/advert";
import {FictitiousUtilsService} from "../fictitiousUtils/fictitious-utils.service";



const TAB_ADVERT: Advert[] = [
    {
        _id: "idNutella",
        userId: "userId",
        title: "pot de nutella XXL",
        advertiser: "nutella",
        images: [
            { url: "nutella_v_1.jpeg", description: "image nutella 1" },
            { url: "nutella_v_2.png", description: "image nutella 2" },
            { url: "nutella_v_3.jpg", description: "image nutella 3" }
        ],
        interests: [ "rock", "basket" ],
        comment: "pub pour vacances de noêl",
        views: 5,
        isVisible: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        _id: "idRolex",
        userId: "userId",
        title: "Rolex",
        advertiser: "rolex",
        images: [
            { url: "rolex_v_1.jpg", description: "rolex 1" },
            { url: "rolex_v_2.png", description: "rolex 2" },
        ],
        interests: [ "rock", "rap" ],
        comment: "pub pour cette année",
        views: 2,
        isVisible: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];



@Injectable({
    providedIn: 'root'
})
export class FictitiousAdvertsService
{

    constructor(private fictitiousUtilsService: FictitiousUtilsService) {}


    getAdvert(): Advert
    {
        const idx = Math.floor(Math.random() * TAB_ADVERT.length);
        let advert = Object.assign({}, TAB_ADVERT[idx]);
        advert._id = advert._id + this.fictitiousUtilsService.makeid(5);
        advert.interests = advert.interests.slice();
        advert.isVisible = (Math.random() < 0.5);
        return advert;
    }


    getTabAdvert(n: number): Advert[]
    {
        let tabAdvert = [];
        for(let i=0 ; i<n ; i++) tabAdvert.push(this.getAdvert());
        return tabAdvert;
    }

}
