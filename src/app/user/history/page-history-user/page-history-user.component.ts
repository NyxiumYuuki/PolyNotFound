import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ThemeService} from "../../../utils/services/theme/theme.service";
import {MessageService} from "../../../utils/services/message/message.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
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
                 private router: Router ) { }


    // charge la page
    ngAfterViewInit(): void
    {
        this.messageService
            .get("user/history")
            .subscribe(ret => this.ngAfterViewInitCallback(ret), err => this.ngAfterViewInitCallback(err));
    }


    ngAfterViewInitCallback(retour: any): void
    {
        if(retour.status !== "success") {
            console.log(retour);
        }
        else {
            const tabVideoHistory = retour.data.map( video => {
                return {
                    _id: video._id,
                    videoId: video.videoId,
                    imageUrl: video.imageUrl,
                    title: video.title,
                    date: video.watchedDate,
                    source: video.source,
                }
            });
            this.dataSource = new MatTableDataSource(tabVideoHistory);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.dataSource = this.dataSource;
        }
    }


    // Applique le filtre
    applyFilter(event: Event): void
    {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }


    // Supprime la video
    onDelete(video: any): void
    {
        this.messageService
            .put("video/update/"+video._id, { watchedDates: []})
            .subscribe(ret => this.onDeleteCallback(ret, video), err => this.onDeleteCallback(err, video))
    }


    onDeleteCallback(retour: any, video: any): void
    {
        if(retour.status !== "success") {
            console.log(retour);
        }
        else {
            const index = this.dataSource.data.indexOf(video);
            this.dataSource.data.splice(index, 1);
            this.dataSource.data = this.dataSource.data;
            this.dataSource = this.dataSource;
        }
    }

    
    onVideo(video: VideoAll): void
    {
        this.messageService
            .put("video/update/"+video._id, {watchedDate: true})
            .subscribe(ret => this.onVideoCallback(ret), err => this.onVideoCallback(err));

        const params = {
            videoId: video.videoId,
            source: video.source,
            from: "history",
        };
        this.router.navigate(['/user/watching'], { queryParams: params });
    }


    onVideoCallback(retour: any): void
    {
        if(retour.status !== "success") console.log(retour);
    }

}
