import {Component, Input, OnChanges } from '@angular/core';
import {Video} from "../../../utils/interfaces/video";
import {UserHistoryService} from "../../../utils/services/userHistory/userHistory.service";
import {AddVideoToPlaylistsService} from "../../../utils/services/addVideoToPlaylists/add-video-to-playlists.service";
import {VideoUrlService} from "../../../utils/services/videoUrl/video-url.service";


@Component({
    selector: 'app-video-grid',
    templateUrl: './video-grid.component.html',
    styleUrls: ['./video-grid.component.scss']
})
export class VideoGridComponent implements OnChanges
{
    @Input() tabVideo: Video[] = [];
    indexPage: number = 0;

    constructor( private historiqueService: UserHistoryService,
                 private addVideoToPlaylistsService: AddVideoToPlaylistsService,
                 private videoUrlService: VideoUrlService ) {}


    ngOnChanges(): void
    {
        //this.historiqueService.clearTabVideoUrlClicked();
    }

    onAdd(video: Video): void
    {
        this.addVideoToPlaylistsService.run(video);
    }

    onIframeClick(video: Video)
    {
        console.log("onIframeClick: " + video.title);
        this.historiqueService.addVideoToHistoque(video);
    }

    tronquage(str: string)
    {
        if(str.length < 30) return str;
        else return str.substring(0, 30) + "..." ;
    }

}
