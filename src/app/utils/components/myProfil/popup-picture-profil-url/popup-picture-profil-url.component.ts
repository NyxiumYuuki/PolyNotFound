import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";



@Component({
  selector: 'app-popup-picture-profil-url',
  templateUrl: './popup-picture-profil-url.component.html',
  styleUrls: ['./popup-picture-profil-url.component.scss']
})
export class PopupPictureProfilUrlComponent implements OnInit
{
    profilePictureUrl: string = "" ;

    constructor( public dialogRef: MatDialogRef<PopupPictureProfilUrlComponent>,
                 @Inject(MAT_DIALOG_DATA) public data ) { }

    ngOnInit(): void
    {
        this.profilePictureUrl = this.data.profilePictureUrl;
    }

    onValider()
    {
        this.dialogRef.close(this.profilePictureUrl);
    }

}
