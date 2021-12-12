import {Component, Input, OnChanges } from '@angular/core';
import {VideoAll} from "../../../utils/interfaces/video";
import {UserHistoryService} from "../../utils/services/userHistory/userHistory.service";
import {AddVideoToPlaylistsService} from "../../utils/services/addVideoToPlaylists/add-video-to-playlists.service";
import {Router} from "@angular/router";



@Component({
    selector: 'app-video-grid',
    templateUrl: './video-grid.component.html',
    styleUrls: ['./video-grid.component.scss']
})
export class VideoGridComponent implements OnChanges
{
    @Input() tabVideo: VideoAll[] = [];
    @Input() search: string = '';
    indexPage: number = 0;

    constructor( private historiqueService: UserHistoryService,
                 private addVideoToPlaylistsService: AddVideoToPlaylistsService,
                 private router: Router) {}


    ngOnChanges(): void
    {
        //this.historiqueService.clearTabVideoUrlClicked();
    }

    onAdd(video: VideoAll): void
    {
        this.addVideoToPlaylistsService.run(video.videoId, video.source);
    }

    tronquage(str: string)
    {
        if(str.length < 33) return str;
        else return str.substring(0, 30) + "..." ;
    }

    onVideo(video: VideoAll): void
    {
        const url = '/user/watching/fromSearch/'+video.videoId+'/'+video.source+'/'+this.search;
        this.router.navigateByUrl(url);
    }

}
