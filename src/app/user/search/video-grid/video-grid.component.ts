import {Component, Input } from '@angular/core';
import {VideoAll} from "../../../utils/interfaces/video";
import {UserHistoryService} from "../../utils/services/userHistory/userHistory.service";
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


    constructor( private historiqueService: UserHistoryService,
                 private addVideoToPlaylistsService: AddVideoToPlaylistsService,
                 private router: Router,
                 private messageService: MessageService ) {}


    onAddToPlaylist(video: VideoAll): void
    {
        this.addVideoToPlaylistsService.run(video.videoId, video.source, video.interest);
    }


    tronquage(str: string)
    {
        if(str.length < 33) return str;
        else return str.substring(0, 30) + "..." ;
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

}
