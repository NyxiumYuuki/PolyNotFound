import {Component, Input, OnInit} from '@angular/core';
import {ThemeService} from "../../../utils/services/theme/theme.service";
import {FictitiousDatasService} from "../../../utils/services/fictitiousDatas/fictitious-datas.service";
import {Video} from "../../../utils/interfaces/video";
import {VideoUrlService} from "../../../utils/services/videoUrl/video-url.service";
import {AddVideoToPlaylistsService} from "../../../utils/services/addVideoToPlaylists/add-video-to-playlists.service";
import {MessageService} from "../../../utils/services/message/message.service";
import {Playlist} from "../../../utils/interfaces/playlist";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserHistoryService} from "../../../utils/services/userHistory/userHistory.service";



@Component({
    selector: 'app-video-list',
    templateUrl: './video-list.component.html',
    styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent
{
    @Input() playlist: Playlist;


    constructor( private messageService: MessageService,
                 public themeService: ThemeService,
                 private fictitiousDatasService: FictitiousDatasService,
                 public videoUrlService: VideoUrlService,
                 private addVideoToPlaylistService: AddVideoToPlaylistsService,
                 private snackBar: MatSnackBar,
                 private historiqueService: UserHistoryService  ) { }


    onAdd(video: Video): void
    {
        this.addVideoToPlaylistService.run(video);
    }


    onDelete(video0: Video, indexVideo: number): void
    {
        // --- FAUX CODE ---
        let message = "La video a bien été supprimé de la playlist" ;
        this.playlist.videos.splice(indexVideo, 1);
        const config = { duration: 1000, panelClass: "custom-class" };
        this.snackBar.open( message, "", config);

        // --- VRAI CODE ---
        /*
        this.messageService
            .sendMessage("user/delete/video", {video: video0, playlist: this.playlist})
            .subscribe( retour => {

                let message = "" ;
                if(retour.status === "error") message = "Echec de l'opération" ;
                else {
                    message = "La video a bien été supprimé de la playlist" ;
                    this.playlist.videos.splice(index, 1);
                }
                const config = { duration: 1000, panelClass: "custom-class" };
                this.snackBar.open( message, "", config);
            })
        */
    }


    onIframeClick(video: Video): void
    {
        console.log("onIframeClick: " + video.title);
        this.historiqueService.addVideoToHistoque(video);
    }

}
