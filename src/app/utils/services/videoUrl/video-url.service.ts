import { Injectable } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class VideoUrlService
{

    constructor(private _sanitizer: DomSanitizer) { }


    safeUrl(videoUrl: string): SafeResourceUrl
    {
        if(videoUrl.includes("youtu")) videoUrl = this.youtubeSafeUrl(videoUrl);
        if(videoUrl.includes("dailymotion")) videoUrl = this.daylimotionSafeUrl(videoUrl);
        return this._sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    }


    youtubeSafeUrl(videoUrl: string): string
    {
        if(videoUrl.includes("youtu.be"))
        {
            console.log("de la forme: https://youtu.be/blablabla");
            const tab = videoUrl.split("youtu.be/");
            videoUrl = tab[0] + "www.youtube.com/embed/" + tab[1];
        }
        else if(videoUrl.includes("youtube.com/watch?v="))
        {
            console.log("de la forme: https://www.youtube.com/watch?v=blablabla");
            const tab = videoUrl.split("youtube.com/watch?v=");
            videoUrl = tab[0] + "youtube.com/embed/" + tab[1];
        }
        return videoUrl;
    }


    daylimotionSafeUrl(videoUrl: string):  string
    {
        console.log("de la forme: https://www.dailymotion.com/video/blablabla");
        const n = "https://www.dailymotion.com/".length;
        return videoUrl.slice(0, n) + "embed/" + videoUrl.slice(n);
    }
}
