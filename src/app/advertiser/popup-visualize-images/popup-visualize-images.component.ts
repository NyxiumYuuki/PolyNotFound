import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ThemeService} from "../../utils/services/theme/theme.service";

@Component({
    selector: 'app-popup-visualize-images',
    templateUrl: './popup-visualize-images.component.html',
    styleUrls: ['./popup-visualize-images.component.scss']
})
export class PopupVisualizeImagesComponent implements OnInit
{
    tabImages = [];
    width: number = 0;
    height: number = 0;


    constructor( public dialogRef: MatDialogRef<PopupVisualizeImagesComponent>,
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
