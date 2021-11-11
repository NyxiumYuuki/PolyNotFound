import {Component, Inject, OnInit} from '@angular/core';
import {ThemeService} from "../../../utils/services/theme/theme.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Advert} from "../../../utils/interfaces/advert";
import {PopupVisualizeImagesComponent} from "../popup-visualize-images/popup-visualize-images.component";

@Component({
  selector: 'app-popup-visualize-ad',
  templateUrl: './popup-visualize-ad.component.html',
  styleUrls: ['./popup-visualize-ad.component.scss']
})
export class PopupVisualizeAdComponent implements OnInit
{
    advert: Advert;


    constructor( public dialogRef: MatDialogRef<PopupVisualizeAdComponent>,
                 @Inject(MAT_DIALOG_DATA) public data,
                 public themeService: ThemeService,
                 public dialog: MatDialog ) { }


    ngOnInit(): void
    {
        this.advert = this.data.advert;
    }


    onVisualizeImages(images: any[])
    {
        const config = {
            width: '400px',
            height: '950px',
            data: {
                images: images,
                width: 300,
                height: 800,
            }
        };
        this.dialog
            .open(PopupVisualizeImagesComponent, config)
            .afterClosed()
            .subscribe(retour => {});
    }

}
