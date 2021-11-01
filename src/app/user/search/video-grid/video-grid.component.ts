import {Component, Input, OnChanges} from '@angular/core';
import {Video} from "../../../utils/interfaces/video";
import {UserHistoryService} from "../../../utils/services/userHistory/userHistory.service";


@Component({
    selector: 'app-video-grid',
    templateUrl: './video-grid.component.html',
    styleUrls: ['./video-grid.component.scss']
})
export class VideoGridComponent implements OnChanges
{
    @Input() tabVideo: Video[] = [];
    tabTriplet = [];


    constructor(private historiqueService: UserHistoryService) {}


    ngOnChanges(): void
    {
        this.historiqueService.clearTabVideoUrlClicked();

        this.tabTriplet = [];
        let n = this.tabVideo.length;
        let i = 0;
        while(i < n)
        {
            let triplet = []
            let compteur = 0;
            while((compteur < 3) && (i < n))
            {
                triplet.push(this.tabVideo[i]);
                i++ ;
                compteur++ ;
            }
            this.tabTriplet.push(triplet)
        }
    }

}
