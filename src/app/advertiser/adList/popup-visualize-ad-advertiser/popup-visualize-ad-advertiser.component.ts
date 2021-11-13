import {Component, Inject, OnInit} from '@angular/core';
import {ThemeService} from "../../../utils/services/theme/theme.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Advert} from "../../../utils/interfaces/advert";



@Component({
    selector: 'app-popup-visualize-ad-advertiser',
    templateUrl: './popup-visualize-ad-advertiser.component.html',
    styleUrls: ['./popup-visualize-ad-advertiser.component.scss']
})
export class PopupVisualizeAdAdvertiserComponent implements OnInit
{
    advert: Advert;

    constructor( public dialogRef: MatDialogRef<PopupVisualizeAdAdvertiserComponent>,
                 @Inject(MAT_DIALOG_DATA) public data,
                 public themeService: ThemeService,
                 public dialog: MatDialog ) { }

    ngOnInit(): void
    {
        this.advert = this.data.advert;
    }

}
