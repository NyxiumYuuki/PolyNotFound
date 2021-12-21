import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AddVideoToPlaylistsService} from "../../utils/services/addVideoToPlaylists/add-video-to-playlists.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {MessageService} from "../../../utils/message/message.service";
import {ThemeService} from "../../../utils/theme/theme.service";
import {ProfilService} from "../../../utils/profil/profil.service";



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
        if(retour.status !== "success") {
            console.log(retour);
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
        this.messageService
            .put("video/update/"+video._id, {watchedDate: true})
            .subscribe(ret => this.onVideoCallback(ret), err => this.onVideoCallback(err));

        const params = {
            videoId: video.videoId,
            source: video.source,
            _idPlaylist: this.playlist._id,
            from: "myPlaylists",
        };
        this.router.navigate(['/user/watching'], { queryParams: params });
    }


    onVideoCallback(retour: any): void
    {
        if(retour.status !== "success") console.log(retour);
    }

}
