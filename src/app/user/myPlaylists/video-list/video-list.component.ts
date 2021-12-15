import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ThemeService} from "../../../utils/services/theme/theme.service";
import {AddVideoToPlaylistsService} from "../../utils/services/addVideoToPlaylists/add-video-to-playlists.service";
import {MessageService} from "../../../utils/services/message/message.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {ProfilService} from "../../../utils/services/profil/profil.service";



@Component({
    selector: 'app-video-list',
    templateUrl: './video-list.component.html',
    styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnChanges
{
    @Input() playlist: any;
    videosInPlaylist: any[] = [];


    constructor( private messageService: MessageService,
                 public themeService: ThemeService,
                 private addVideoToPlaylistsService: AddVideoToPlaylistsService,
                 private snackBar: MatSnackBar,
                 private profilService: ProfilService,
                 private router: Router ) { }


    ngOnChanges(changes: SimpleChanges): void
    {
        console.log("ngOnChanges:");
        console.log(this.playlist);
        if((this.playlist !== null) && (this.playlist !== undefined)) this.videosInPlaylist = this.playlist.videos;
    }


    onAddToPlaylist(video: any): void
    {
        this.addVideoToPlaylistsService.run(video.videoId, video.source, video.interest);
    }


    onDelete(video0: any, indexVideo: number): void
    {
        const data = {
            videoId: {
                id: video0._id,
                action: "delete"
            }
        }
        this.messageService
            .put("playlist/update/"+this.playlist._id, data)
            .subscribe( ret => this.onDeleteCallback(ret, indexVideo), err => this.onDeleteCallback(err, indexVideo));
    }


    onDeleteCallback(retour: any, indexVideo: number): void
    {
        console.log("onDeleteCallback:" );
        console.log(retour);

        if(retour.status !== "success") {
            //console.log(retour);
        }
        else {
            this.playlist.videos.splice(indexVideo, 1);
            this.videosInPlaylist.splice(indexVideo, 1);
            let message = "La video a bien été supprimé de la playlist";
            const config = { duration: 1000, panelClass: "custom-class" };
            this.snackBar.open( message, "", config);
        }
    }


    onVideo(video: any): void
    {
        const url = "user/watching/fromMyPlaylists/" + video.videoId + '/' + this.playlist._id;
        this.router.navigateByUrl(url);
    }

}
