import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Video} from "../../../utils/interfaces/video";


@Component({
    selector: 'app-video-grid',
    templateUrl: './video-grid.component.html',
    styleUrls: ['./video-grid.component.scss']
})
export class VideoGridComponent implements OnChanges
{
    @Input() tabVideo: Video[] = [];
    tabTriplet = [];

    ngOnChanges(changes: SimpleChanges): void
    {
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
