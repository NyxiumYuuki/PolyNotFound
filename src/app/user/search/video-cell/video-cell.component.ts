import {
    Component,
    Input,
    OnInit,
} from '@angular/core';
import {VideoUrlService} from "../../../utils/services/videoUrl/video-url.service";
import {AddVideoToPlaylistsService} from "../../../utils/services/addVideoToPlaylists/add-video-to-playlists.service";
import {Video} from "../../../utils/interfaces/video";
import {ThemeService} from "../../../utils/services/theme/theme.service";
import {WatchedVideo} from "../../../utils/interfaces/watchedVideo";
import {MessageService} from "../../../utils/services/message/message.service";
import {UserHistoryService} from "../../../utils/services/userHistory/userHistory.service";

@Component({
    selector: 'app-video-cell',
    templateUrl: './video-cell.component.html',
    styleUrls: ['./video-cell.component.scss']
})
export class VideoCellComponent implements OnInit
{
    @Input() video: Video;
    safeUrl;
    tabVideoUrlClicked: string[] = [];

    constructor( private videoUrlService: VideoUrlService,
                 private addVideoToPlaylistsService: AddVideoToPlaylistsService,
                 public themeService: ThemeService,
                 private messageService: MessageService,
                 private historiqueService: UserHistoryService ) {}

    ngOnInit(): void
    {
        this.safeUrl = this.videoUrlService.safeUrl(this.video.url);
    }

    onAdd(): void
    {
        this.addVideoToPlaylistsService.run(this.video);
    }

    onIframeClick()
    {
        console.log("onIframeClick: " + this.video.title);
        this.historiqueService.addVideoToHistoque(this.video);
    }

}
