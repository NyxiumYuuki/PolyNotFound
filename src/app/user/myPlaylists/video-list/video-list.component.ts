import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ThemeService} from "../../../utils/services/theme/theme.service";
import {VideoAll, VideoDB} from "../../../utils/interfaces/video";
import {AddVideoToPlaylistsService} from "../../utils/services/addVideoToPlaylists/add-video-to-playlists.service";
import {MessageService} from "../../../utils/services/message/message.service";
import {PlaylistDB} from "../../../utils/interfaces/playlist";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserHistoryService} from "../../utils/services/userHistory/userHistory.service";
import {FictitiousUtilsService} from "../../../utils/services/fictitiousDatas/fictitiousUtils/fictitious-utils.service";
import {FictitiousVideosService} from "../../../utils/services/fictitiousDatas/fictitiousVideos/fictitious-videos.service";



@Component({
    selector: 'app-video-list',
    templateUrl: './video-list.component.html',
    styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnChanges
{
    @Input() playlist: PlaylistDB;
    videosInPlaylist: VideoAll[] = [];
    allUserVideos: VideoAll[] = this.fictitiousVideosService.getAllVideoAll();


    constructor( private messageService: MessageService,
                 public themeService: ThemeService,
                 private fictitiousUtilsService: FictitiousUtilsService,
                 private addVideoToPlaylistService: AddVideoToPlaylistsService,
                 private snackBar: MatSnackBar,
                 public fictitiousVideosService: FictitiousVideosService,
                 private historiqueService: UserHistoryService ) { }


    ngOnChanges(changes: SimpleChanges): void
    {
        if((this.playlist !== null) && (this.playlist !== undefined))
        {
            this.videosInPlaylist = [];
            for(let _idVideo of this.playlist.videoIds)
            {
                const video = this.allUserVideos.find(video => video._id === _idVideo);
                this.videosInPlaylist.push(video);
            }
        }
    }


    onAdd(video: VideoAll): void
    {
        this.addVideoToPlaylistService.run(video);
    }


    onDelete(video0: VideoAll, indexVideo: number): void
    {
        // --- FAUX CODE ---
        this.playlist.videoIds.splice(indexVideo, 1);
        this.videosInPlaylist.splice(indexVideo, 1);

        let message = "La video a bien été supprimé de la playlist";
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

        //Pour relier les collections "Videos" et "Playlists", on a mis l'attribut "playlistIds" dans "Videos"
        // Mais en vrai, ça serai plus facile pour moi si on mettait plutot un attribut "videoIds" dans "Playlists"
    }

}
