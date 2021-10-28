import {
    Component,
    Input,
    OnInit,
} from '@angular/core';
import {VideoUrlService} from "../../../utils/services/videoUrl/video-url.service";
import {AddVideoToPlaylistsService} from "../../../utils/services/addVideoToPlaylists/add-video-to-playlists.service";
import {Video} from "../../../utils/interfaces/video";

@Component({
  selector: 'app-video-cell',
  templateUrl: './video-cell.component.html',
  styleUrls: ['./video-cell.component.scss']
})
export class VideoCellComponent implements OnInit
{
    @Input() video: Video;
    safeUrl;

    constructor( private videoUrlService: VideoUrlService,
                 private addVideoToPlaylistsService: AddVideoToPlaylistsService ) {}

    ngOnInit(): void
    {
        this.safeUrl = this.videoUrlService.safeUrl(this.video.url);
    }

    onAdd(): void
    {
        this.addVideoToPlaylistsService.run(this.video);
    }

  onIframeClick(videoUrl: string) {
    console.log("test click iframe "+ videoUrl);
  }
}
