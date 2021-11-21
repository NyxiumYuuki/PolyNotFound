import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ThemeService} from "../../../utils/services/theme/theme.service";
import {MessageService} from "../../../utils/services/message/message.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {VideoUrlService} from "../../utils/services/videoUrl/video-url.service";
import {UserHistoryService} from "../../utils/services/userHistory/userHistory.service";
import {MatPaginator} from "@angular/material/paginator";
import {FictitiousVideosService} from "../../../utils/services/fictitiousDatas/fictitiousVideos/fictitious-videos.service";
import {VideoAll} from "../../../utils/interfaces/video";
import {Router} from "@angular/router";



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
                 private fictitiousVideosService: FictitiousVideosService,
                 public videoUrlService: VideoUrlService,
                 private userHistoryService: UserHistoryService,
                 private router: Router ) { }


    // charge la page
    ngAfterViewInit(): void
    {
        this.userHistoryService.clearTabVideoUrlClicked();

        // --- FAUX CODE ---
        const tabVideo: VideoAll[] = this.fictitiousVideosService.getTabVideoAll(8);
        this.dataSource = new MatTableDataSource(tabVideo);
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
    onDelete(video: VideoAll): void
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

    
    onVideo(video: VideoAll): void
    {
        const url = '/user/watching/fromHistory/'+video.videoId+'/'+video.source ;
        this.router.navigateByUrl(url);
    }

}
