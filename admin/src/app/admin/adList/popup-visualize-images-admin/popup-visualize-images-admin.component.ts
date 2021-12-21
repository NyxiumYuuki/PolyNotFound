import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-popup-visualize-images-admin',
  templateUrl: './popup-visualize-images-admin.component.html',
  styleUrls: ['./popup-visualize-images-admin.component.scss']
})
export class PopupVisualizeImagesAdminComponent implements OnInit {
    tabImages = [];
    index: number = 0;
    nbImage: number = 0;


    constructor( public dialogRef: MatDialogRef<PopupVisualizeImagesAdminComponent>,
                 @Inject(MAT_DIALOG_DATA) public data ) { }


    ngOnInit(): void
    {
        this.tabImages = this.data.images;
        this.nbImage = this.tabImages.length;
    }

    onPrecedent(): void
    {
        if(this.index !== 0) this.index -= 1;
    }

    onSuivant(): void
    {
        if(this.index !== (this.nbImage-1)) this.index += 1;
    }

}
