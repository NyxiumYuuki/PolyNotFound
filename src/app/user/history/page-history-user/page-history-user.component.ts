import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ThemeService} from "../../../utils/services/theme/theme.service";
import {MessageService} from "../../../utils/services/message/message.service";
import {FictitiousDatasService} from "../../../utils/services/fictitiousDatas/fictitious-datas.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {VideoUrlService} from "../../../utils/services/videoUrl/video-url.service";
import {UserHistoryService} from "../../../utils/services/userHistory/userHistory.service";
import {Video} from "../../../utils/interfaces/video";
import {MatPaginator} from "@angular/material/paginator";



@Component({
    selector: 'app-page-history-user',
    templateUrl: './page-history-user.component.html',
    styleUrls: ['./page-history-user.component.scss']
})
export class PageHistoryUserComponent implements AfterViewInit
{
    displayedColumns: string[] = [ 'aperçu', 'title', 'date', 'source', 'action' ];
    dataSource ;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;


    constructor( public themeService: ThemeService,
                 private messageService: MessageService,
                 private fictitiousDatasService: FictitiousDatasService,
                 public videoUrlService: VideoUrlService,
                 private userHistoryService: UserHistoryService ) { }


    // charge la page
    ngAfterViewInit(): void
    {
        this.userHistoryService.clearTabVideoUrlClicked();

        // --- FAUX CODE ---
        const tabVideo: Video[] = this.fictitiousDatasService.getTabVideo(8);

        const tabVideoChanged = [];
        for(let video of tabVideo)
        {
            tabVideoChanged.push({
                _id: video._id,
                url: video.url,
                title: video.title,
                description: video.description,
                views: video.views,
                watched: video.watched,
                source: this.getSourceByUrl(video.url)
            });
        }

        this.dataSource = new MatTableDataSource(tabVideoChanged);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource = this.dataSource;

        // --- VRAI CODE ---
        /*
        this.messageService
            .sendMessage( "user/get/history", null )
            .subscribe( retour => {

                if(retour.status === "error") console.log(retour);
                else {
                    this.dataSource = new MatTableDataSource(retour.data);
                    this.dataSource.sort = this.sort;
                }
            });
        */
    }


    // Applique le filtre
    applyFilter(event: Event): void
    {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }


    // Retourne la source de la video en fonction de l'url
    getSourceByUrl(url: string): string
    {
        if(url.includes("youtu")) return "Youtube" ;
        else if(url.includes("daily")) return "Dailymotion" ;
        else return "???" ;
    }


    // Supprime la video
    onDelete(video: Video): void
    {
        // --- FAUX CODE ---
        const index = this.dataSource.data.indexOf(video);
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


    // Ajoute la date actuelle dans watched.video
    onIframeClick(video: Video): void
    {
        console.log("onIframeClick: " + video.title);
        this.userHistoryService.addVideoToHistoque(video);
    }

}
