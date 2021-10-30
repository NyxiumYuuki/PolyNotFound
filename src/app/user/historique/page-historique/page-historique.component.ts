import {Component, OnInit, ViewChild} from '@angular/core';
import {ThemeService} from "../../../utils/services/theme/theme.service";
import {MessageService} from "../../../utils/services/message/message.service";
import {FictitiousDatasService} from "../../../utils/services/fictitiousDatas/fictitious-datas.service";
import {WatchedVideo} from "../../../utils/interfaces/watchedVideo";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {VideoUrlService} from "../../../utils/services/videoUrl/video-url.service";
import {HistoriqueService} from "../../../utils/services/historique/historique.service";




@Component({
    selector: 'app-page-historique',
    templateUrl: './page-historique.component.html',
    styleUrls: ['./page-historique.component.scss']
})
export class PageHistoriqueComponent implements OnInit
{
    displayedColumns: string[] = [ 'aperçu', 'titre', 'date', 'source', 'effacer' ];
    dataSource ;
    @ViewChild(MatSort) sort: MatSort;


    constructor( public themeService: ThemeService,
                 private messageService: MessageService,
                 private fictitiousDataService: FictitiousDatasService,
                 public videoUrlService: VideoUrlService,
                 private historiqueService: HistoriqueService ) { }


    ngOnInit(): void
    {
        this.historiqueService.clearTabVideoUrlClicked();

        // --- FAUX CODE ---
        const tabWatchedVideo = this.fictitiousDataService.getTabWatchedVideo(8);
        this.dataSource = new MatTableDataSource(tabWatchedVideo);
        this.dataSource.sort = this.sort;

        // --- VRAI CODE ---
        /*
        this.messageService
            .sendMessage( "user/get/historique", null )
            .subscribe( retour => {

                if(retour.status === "error") console.log(retour);
                else {
                    this.dataSource = new MatTableDataSource(retour.data);
                    this.dataSource.sort = this.sort;
                }
            });
        */
    }


    applyFilter(event: Event)
    {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }


    getSourceByUrl(url: string): string
    {
        if(url.includes("youtu")) return "Youtube" ;
        else if(url.includes("daily")) return "Dailymotion" ;
        else return "???" ;
    }


    onDelete(watchedVideo: WatchedVideo): void
    {
        // --- FAUX CODE ---
        const index = this.dataSource.data.indexOf(watchedVideo);
        this.dataSource.data.splice(index, 1);
        this.dataSource.data = this.dataSource.data;
        this.dataSource = this.dataSource;

        // --- VRAI CODE ---
        /*
        this.messageService
            .sendMessage("user/delete/videoSeen", { "watchedVideo": watchedVideo})
            .subscribe( retour => {

                if(retour.status === "error") console.log(retour);
                else {
                    const index = this.dataSource.data.indexOf(watchedVideo);
                    this.dataSource.data.splice(index, 1);
                    this.dataSource.data = this.dataSource.data;
                    this.dataSource = this.dataSource;
                }
            });
        */
    }


    onIframeClick(watchedVideo: WatchedVideo)
    {
        console.log("onIframeClick: " + watchedVideo.title);
        this.historiqueService.addWatchedVideoToHistorique(watchedVideo);
    }

}
