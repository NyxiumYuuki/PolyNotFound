import {Component, Inject, OnInit} from '@angular/core';
import {Advert} from "../../../utils/interfaces/advert";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ThemeService} from "../../../utils/services/theme/theme.service";
import {PopupVisualizeImagesAdminComponent} from "../popup-visualize-images-admin/popup-visualize-images-admin.component";



@Component({
    selector: 'app-popup-visualize-ad-admin',
    templateUrl: './popup-visualize-ad-admin.component.html',
    styleUrls: ['./popup-visualize-ad-admin.component.scss']
})
export class PopupVisualizeAdAdminComponent implements OnInit
{
    advert: Advert;


    constructor( public dialogRef: MatDialogRef<PopupVisualizeAdAdminComponent>,
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
            .open(PopupVisualizeImagesAdminComponent, config)
            .afterClosed()
            .subscribe(retour => {});
    }

}
