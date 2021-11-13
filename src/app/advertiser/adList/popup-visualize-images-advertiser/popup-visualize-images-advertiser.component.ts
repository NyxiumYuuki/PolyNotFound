import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";



@Component({
    selector: 'app-popup-visualize-images-advertiser',
    templateUrl: './popup-visualize-images-advertiser.component.html',
    styleUrls: ['./popup-visualize-images-advertiser.component.scss']
})
export class PopupVisualizeImagesAdvertiserComponent implements OnInit
{
    tabImages = [];
    width: number = 0;
    height: number = 0;


    constructor( public dialogRef: MatDialogRef<PopupVisualizeImagesAdvertiserComponent>,
                 @Inject(MAT_DIALOG_DATA) public data ) { }


    ngOnInit(): void
    {
        this.width = this.data.width;
        this.height = this.data.height;

        for(let couple of this.data.images)
        {
            const elt = { path: "assets/pub/"+couple.url };
            this.tabImages.push(elt);
        }
        console.log(this.tabImages);
    }

}
