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
        views: [
            new Date(2021,10,1),
            new Date(2021,10,2),
            new Date(2021,10,3),
            new Date(2021,10,3),
            new Date(2021,10,5),
            new Date(2021,10,5),
            new Date(2021,10,5),
            new Date(2021,10,5),
            new Date(2021,10,5),
            new Date(2021,10,7)
        ],
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
        views: [
            new Date(2021,10,5),
            new Date(2021,10,6),
            new Date(2021,10,7),
            new Date(2021,10,8),
            new Date(2021,10,8),
            new Date(2021,10,8),
            new Date(2021,10,25),
            new Date(2021,10,25),
            new Date(2021,10,25),
            new Date(2021,10,27)
        ],
        isVisible: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        _id: "idAlbion",
        userId: "userId",
        title: "Albion new version",
        advertiser: "albion",
        images: [
            { url: "rolex_v_1.jpg", description: "albion 1" },
            { url: "rolex_v_2.png", description: "albion 2" },
        ],
        interests: [ "rock", "rap" ],
        comment: "pub pour cette année",
        views: [
            new Date(2021,10,3),
            new Date(2021,10,4),
            new Date(2021,10,4),
            new Date(2021,10,5),
            new Date(2021,10,5),
            new Date(2021,10,6),
            new Date(2021,10,6),
            new Date(2021,10,8),
            new Date(2021,10,8),
            new Date(2021,10,8)
        ],
        isVisible: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
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


    get_TAB_ADVERT(): Advert[]
    {
        return TAB_ADVERT;
    }

}
