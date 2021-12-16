import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ThemeService} from "../../../utils/services/theme/theme.service";
import {PlaylistDB} from "../../../utils/interfaces/playlist";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PopupCreateOrUpdatePlaylistComponent} from "../popup-create-or-update-playlist/popup-create-or-update-playlist.component";
import {FictitiousVideosService} from "../../../utils/services/fictitiousDatas/fictitiousVideos/fictitious-videos.service";
import {PopupDeletePlaylistComponent} from "../popup-delete-playlist/popup-delete-playlist.component";
import {MessageService} from "../../../utils/services/message/message.service";



@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.scss']
})
export class PlaylistListComponent implements OnInit
{
    allPlaylists: PlaylistDB[] = [];                           // toutes les playlists
    @Output() eventEmitter = new EventEmitter<PlaylistDB>();   // pour envoyer au parent la playlist selectionner
    search: string = "" ;                                      // contenu de la barre de recherche
    tabPlaylist: PlaylistDB[] = [];                            // playlist affichées
    playlistFocusedOn: PlaylistDB;


    constructor( public themeService: ThemeService,
                 public dialog: MatDialog,
                 public snackBar: MatSnackBar,
                 private fictitiousVideosService: FictitiousVideosService,
                 private messageService: MessageService ) { }


    ngOnInit(): void
    {
        this.messageService
            .get("playlist/findAll")
            .subscribe( retour => this.ngOnInitCallback(retour), err => this.ngOnInitCallback(err) );
    }


    ngOnInitCallback(retour: any): void
    {
        if(retour.status !== "success") {
            console.log(retour);
        } else {
            const aux = retour.data.filter( x => x.isActive === true);
            this.allPlaylists = aux.map(x => {
                x["_id"] = x.id ;
                return x;
            });
            this.tabPlaylist = [].concat(this.allPlaylists);
        }
    }


    // s'execute lorsqu'on écrit sur la barre de recherche
    whileSearch()
    {
        this.tabPlaylist = [];
        for(let playlist of this.allPlaylists)
        {
            if(playlist.name.includes(this.search)) this.tabPlaylist.push(playlist);
        }
    }


    // click sur créer playlist
    onCreatePlaylist(): void
    {
        const config = {
            data: {
                action: "create",
                tabPlaylist: this.tabPlaylist,
            }
        };
        this.dialog
            .open(PopupCreateOrUpdatePlaylistComponent, config )
            .afterClosed()
            .subscribe(playlist => {

                const config = { duration: 1500, panelClass: "custom-class" };
                if((playlist === null) || (playlist === undefined)) {
                    this.snackBar.open("Opération annulée", "", config);
                }
                else {
                    playlist["_id"] = playlist.id;
                    this.allPlaylists.push(playlist);
                    this.tabPlaylist.push(playlist);
                    this.snackBar.open(`La playlist '${playlist.name}' a bien été créée  ✔`, "", config);
                }
            });
    }


    // click sur update playlist
    onUpdatePlaylist(playlistToUpdate: PlaylistDB): void
    {
        const config = {
            data: {
                action: "update",
                tabPlaylist: this.tabPlaylist,
                playlistName: playlistToUpdate.name,
                playlistId: playlistToUpdate._id
            }
        };
        this.dialog
            .open(PopupCreateOrUpdatePlaylistComponent, config)
            .afterClosed()
            .subscribe(newName => {

                const config = { duration: 1500, panelClass: "custom-class" };
                if((newName === null) || (newName === undefined)) {
                    this.snackBar.open("Opération annulée", "", config);
                }
                else {
                    let index = this.allPlaylists.findIndex( elt => (elt._id === playlistToUpdate._id));
                    this.allPlaylists[index].name = newName;
                    index = this.tabPlaylist.findIndex( elt => (elt._id === playlistToUpdate._id));
                    this.tabPlaylist[index].name = newName;
                    this.snackBar.open(`La playlist '${playlistToUpdate.name}' a bien été mise à jour  ✔`, "", config);
                    this.eventEmitter.emit(this.tabPlaylist[index]);
                    this.playlistFocusedOn = this.tabPlaylist[index]
                }
            });
    }


    // click sur supprimer playlist
    onDeletePlaylist(playlist: PlaylistDB): void
    {
        const config = {data: playlist};
        this.dialog
            .open(PopupDeletePlaylistComponent, config)
            .afterClosed()
            .subscribe(retour => {

                const config = { duration: 1500, panelClass: "custom-class" };
                if((retour === null) || (retour === undefined)) {
                    this.snackBar.open("Opération annulée", "", config);
                }
                else {
                    let index = this.allPlaylists.indexOf(playlist);
                    if(index >= 0) this.allPlaylists.splice(index, 1);

                    index = this.tabPlaylist.indexOf(playlist);
                    if(index >= 0) this.tabPlaylist.splice(index, 1);

                    this.eventEmitter.emit(null);
                    this.playlistFocusedOn = null;
                    this.snackBar.open(`La playlist '${playlist.name}' a bien été suprimée  ✔`, "", config);
                }
            });
    }


    // retourne la class CSS de conteneur de playlist
    getClassOfPlaylistContainer(playlist: PlaylistDB): string
    {
        if(playlist === this.playlistFocusedOn) return "row btnPlaylist btnPlaylistFocus" ;
        else return "row btnPlaylist" ;
    }

}
