import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class FictitiousUtilsService
{

    makeid(length)
    {
        let res = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for( let i = 0; i < length; i++ ) {
            const k = Math.floor(Math.random() * characters.length);
            res += characters.charAt(k);
        }
        return res;
    }


    randomDate(start, end): Date
    {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }


    getTags(): string[]
    {
        return [ "musique", "rap", "rock", "sport", "foot", "basket", "tennis", "film", "action", "aventure", "horreur", "romance", "comedie"];
    }

}
