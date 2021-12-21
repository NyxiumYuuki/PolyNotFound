import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ThemeService} from "../../../utils/theme/theme.service";



@Component({
    selector: 'app-popup-visualize-ad-advertiser',
    templateUrl: './popup-visualize-ad-advertiser.component.html',
    styleUrls: ['./popup-visualize-ad-advertiser.component.scss']
})
export class PopupVisualizeAdAdvertiserComponent implements OnInit
{
    advert: any;

    constructor( public dialogRef: MatDialogRef<PopupVisualizeAdAdvertiserComponent>,
                 @Inject(MAT_DIALOG_DATA) public data,
                 public themeService: ThemeService,
                 public dialog: MatDialog ) { }

    ngOnInit(): void
    {
        this.advert = this.data.advert;
    }

}
