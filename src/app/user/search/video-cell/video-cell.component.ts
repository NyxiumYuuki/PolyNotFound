import {Component, Input, OnInit} from '@angular/core';
import {VideoUrlService} from "../../../utils/services/videoUrl/video-url.service";
import {PlaylistService} from "../../../utils/services/playlist/playlist.service";
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
                 private playlistService: PlaylistService ) {}


    ngOnInit(): void
    {
        this.safeUrl = this.videoUrlService.safeUrl(this.video.url);
    }


    onAdd(): void
    {
        this.playlistService.addVideoToPlaylists(this.video)
        console.log("onAdd:" + this.video.title);
    }
}
