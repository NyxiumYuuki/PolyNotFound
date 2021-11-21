import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ThemeService} from "../../../utils/services/theme/theme.service";
import {PlaylistDB} from "../../../utils/interfaces/playlist";
import {MessageService} from "../../../utils/services/message/message.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PopupCreatePlaylistComponent} from "../../utils/components/popup-create-playlist/popup-create-playlist.component";
import {FictitiousVideosService} from "../../../utils/services/fictitiousDatas/fictitiousVideos/fictitious-videos.service";



@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.scss']
})
export class PlaylistListComponent implements OnInit
{
    allPlaylists: PlaylistDB[] = [];                           // toutes les playlists
    @Output() eventEmitter = new EventEmitter<PlaylistDB>();   // pour envoyer au parent la playlist selectionner
    search: string = "" ;                                    // contenu de la barre de recherche
    tabPlaylist: PlaylistDB[] = [];                            // playlist affichées


    constructor( public themeService: ThemeService,
                 public dialog: MatDialog,
                 public snackBar: MatSnackBar,
                 private fictitiousVideosService: FictitiousVideosService ) { }


    ngOnInit(): void
    {
        //this.allPlaylists = this.fictitiousVideosService.getRandomTabPlaylistDB(10, 10);
        this.allPlaylists = this.fictitiousVideosService.getNoRandomTabPlaylistDB(10);
        this.tabPlaylist = [].concat(this.allPlaylists);
    }


    whileSearch()
    {
        console.log("whileSearch");
        this.tabPlaylist = [];
        for(let playlist of this.allPlaylists)
        {
            if(playlist.name.includes(this.search)) this.tabPlaylist.push(playlist);
        }
    }


    onCreatePlaylist(): void
    {
        const config = { width: '30%', data: this.tabPlaylist };
        this.dialog
            .open(PopupCreatePlaylistComponent, config )
            .afterClosed()
            .subscribe(playlist => {

                const config = { duration: 1000, panelClass: "custom-class" };
                if((playlist === null) || (playlist === undefined)) {
                    this.snackBar.open("Opération annulée  ❌", "", config);
                }
                else {
                    this.allPlaylists.push(playlist);
                    this.tabPlaylist.push(playlist);
                    this.snackBar.open("La playlist a bien été créée  ✔", "", config);
                }
            });
    }

}
