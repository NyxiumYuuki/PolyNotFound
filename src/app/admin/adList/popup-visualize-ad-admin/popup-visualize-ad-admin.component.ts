import {Component, Inject, OnInit} from '@angular/core';
import {Advert} from "../../../utils/interfaces/advert";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ThemeService} from "../../../utils/services/theme/theme.service";



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
                 public themeService: ThemeService ) { }

    ngOnInit(): void
    {
        this.advert = this.data.advert;
    }

}
