import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ThemeService} from "../../../utils/services/theme/theme.service";
import {Playlist} from "../../../utils/interfaces/playlist";
import {MessageService} from "../../../utils/services/message/message.service";
import {MatDialog} from "@angular/material/dialog";
import {PopupAddVideoToPlaylistsComponent} from "../../../utils/components/popup-add-video-to-playlists/popup-add-video-to-playlists.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PopupCreatePlaylistComponent} from "../../../utils/components/popup-create-playlist/popup-create-playlist.component";



@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.scss']
})
export class PlaylistListComponent implements OnInit
{
    @Input() allPlaylists: Playlist[] = [];                  // toutes les playlists
    @Output() eventEmitter = new EventEmitter<Playlist>();   // pour envoyer au parent la playlist selectionner
    search: string = "" ;                                    // contenu de la barre de recherche
    tabPlaylist: Playlist[] = [];                            // playlist affichées


    constructor( public themeService: ThemeService,
                 public dialog: MatDialog,
                 public snackBar: MatSnackBar ) { }


    ngOnInit(): void
    {
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
        const config = { width: '15%', data: this.tabPlaylist };
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
