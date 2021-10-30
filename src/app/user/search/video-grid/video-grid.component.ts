import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Video} from "../../../utils/interfaces/video";
import {VideoUrlService} from "../../../utils/services/videoUrl/video-url.service";
import {AddVideoToPlaylistsService} from "../../../utils/services/addVideoToPlaylists/add-video-to-playlists.service";
import {ThemeService} from "../../../utils/services/theme/theme.service";
import {MessageService} from "../../../utils/services/message/message.service";
import {WatchedVideo} from "../../../utils/interfaces/watchedVideo";
import {HistoriqueService} from "../../../utils/services/historique/historique.service";


@Component({
    selector: 'app-video-grid',
    templateUrl: './video-grid.component.html',
    styleUrls: ['./video-grid.component.scss']
})
export class VideoGridComponent implements OnChanges
{
    @Input() tabVideo: Video[] = [];
    tabTriplet = [];


    constructor(private historiqueService: HistoriqueService) {}


    ngOnChanges(): void
    {
        this.historiqueService.clearTabVideoUrlClicked();

        this.tabTriplet = [];
        let n = this.tabVideo.length;
        let i = 0;
        while(i < n)
        {
            let triplet = []
            let compteur = 0;
            while((compteur < 3) && (i < n))
            {
                triplet.push(this.tabVideo[i]);
                i++ ;
                compteur++ ;
            }
            this.tabTriplet.push(triplet)
        }
    }

}
