import {Component, Input } from '@angular/core';
import {VideoAll} from "../../../utils/interfaces/video";
import {AddVideoToPlaylistsService} from "../../utils/services/addVideoToPlaylists/add-video-to-playlists.service";
import {Router} from "@angular/router";
import {MessageService} from "../../../utils/services/message/message.service";



@Component({
    selector: 'app-video-grid',
    templateUrl: './video-grid.component.html',
    styleUrls: ['./video-grid.component.scss']
})
export class VideoGridComponent
{
    @Input() tabVideo: VideoAll[] = [];
    @Input() search: string = '';
    indexPage: number = 0;


    constructor( private addVideoToPlaylistsService: AddVideoToPlaylistsService,
                 private router: Router,
                 private messageService: MessageService ) {}


    onAddToPlaylist(video: VideoAll): void
    {
        this.addVideoToPlaylistsService.run(video.videoId, video.source, video.interest);
    }


    tronquage(str: string)
    {
        if(str.length < 30) return str;
        else return str.substring(0, 27) + "..." ;
    }


    onVideo(video: VideoAll): void
    {
        const data = { source: video.source, interest: video.interest };
        this.messageService
            .post("video/create/"+video.videoId, data)
            .subscribe(ret => this.onVideoCallback(ret), err => this.onVideoCallback(err));

        const url = '/user/watching/fromSearch/'+video.videoId+'/'+video.source+'/'+this.search;
        this.router.navigateByUrl(url);
    }


    onVideoCallback(retour: any): void
    {
        if(retour.status !== "success") console.log(retour);
    }


    dateToElapsedTime(date0): string
    {
        const ellapsedTimeInMilliSeconds = (new Date()).getTime() - (new Date(date0)).getTime();

        // seconde
        const ellapsedTimeInSeconds = Math.trunc(ellapsedTimeInMilliSeconds / 1000);
        if(ellapsedTimeInSeconds < 60) {
            if(ellapsedTimeInSeconds <= 1)return ellapsedTimeInSeconds + " seconde" ;
            else return ellapsedTimeInSeconds + " secondes" ;
        }
        // minute
        const ellapsedTimeInMinutes = Math.trunc(ellapsedTimeInSeconds / 60);
        if(ellapsedTimeInMinutes < 60) {
            if(ellapsedTimeInMinutes <= 1) return ellapsedTimeInMinutes + " minute" ;
            else return ellapsedTimeInMinutes + " minutes" ;
        }
        // heure
        const ellapsedTimeInHours = Math.trunc(ellapsedTimeInMinutes / 60);
        if(ellapsedTimeInHours < 24) {
            if(ellapsedTimeInHours <= 1) return ellapsedTimeInHours + " heure" ;
            else return ellapsedTimeInHours + " heures" ;
        }
        // jour
        const ellapsedTimeInDays = Math.trunc(ellapsedTimeInHours / 24);
        if(ellapsedTimeInDays < 31) {
            if(ellapsedTimeInDays <= 1) return ellapsedTimeInDays + " jour" ;
            else return ellapsedTimeInDays + " jours" ;
        }
        // mois
        const ellapsedTimeInMonths = Math.trunc(ellapsedTimeInDays / 31);
        if(ellapsedTimeInMonths < 12) {
            return ellapsedTimeInMonths + " mois" ;
        }
        // an
        const ellapsedTimeInYears = Math.trunc(ellapsedTimeInMonths / 12);
        if(ellapsedTimeInYears <= 1) return ellapsedTimeInYears + " an" ;
        else return ellapsedTimeInYears + " ans" ;
    }

}
