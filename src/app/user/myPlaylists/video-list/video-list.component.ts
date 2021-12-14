import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ThemeService} from "../../../utils/services/theme/theme.service";
import {VideoAll, VideoDB} from "../../../utils/interfaces/video";
import {AddVideoToPlaylistsService} from "../../utils/services/addVideoToPlaylists/add-video-to-playlists.service";
import {MessageService} from "../../../utils/services/message/message.service";
import {PlaylistDB} from "../../../utils/interfaces/playlist";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserHistoryService} from "../../utils/services/userHistory/userHistory.service";
import {FictitiousVideosService} from "../../../utils/services/fictitiousDatas/fictitiousVideos/fictitious-videos.service";
import {Router} from "@angular/router";
import {HttpParams} from "@angular/common/http";
import {ProfilService} from "../../../utils/services/profil/profil.service";



@Component({
    selector: 'app-video-list',
    templateUrl: './video-list.component.html',
    styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnChanges, OnInit
{
    @Input() playlist: any;
    videosInPlaylist: VideoAll[] = [];
    allUserVideos: VideoAll[] = this.fictitiousVideosService.get_TAB_VIDEO();


    constructor( private messageService: MessageService,
                 public themeService: ThemeService,
                 private addVideoToPlaylistService: AddVideoToPlaylistsService,
                 private snackBar: MatSnackBar,
                 public fictitiousVideosService: FictitiousVideosService,
                 private historiqueService: UserHistoryService,
                 private profilService: ProfilService,
                 private router: Router ) { }


    ngOnInit(): void
    {
        let params = new HttpParams();
        params = params.append("userId", this.profilService.id);
        console.log("id: " + this.profilService.id);
        this.messageService
            .get("video/findAll", params)
            .subscribe(ret => this.afterReceivingUserVideo(ret), err => this.afterReceivingUserVideo(err));
    }


    afterReceivingUserVideo(retour: any)
    {
        console.log("afterReceivingUserVideo: ");
        console.log(retour);

        if(retour.status !== "success") {
            //console.log(retour);
        }
        else {
            this.allUserVideos = retour.data;
            this.reloadVideoInPlaylist();
        }
    }


    ngOnChanges(changes: SimpleChanges): void
    {
        console.log("ngOnChanges:");
        console.log(this.playlist);
        this.reloadVideoInPlaylist();
    }


    reloadVideoInPlaylist(): void
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
        //this.addVideoToPlaylistService.run(video);
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


    onVideo(video: VideoDB): void
    {
        const url = "user/watching/fromMyPlaylists/" + video.videoId + '/' + this.playlist._id;
        this.router.navigateByUrl(url);
    }

}
