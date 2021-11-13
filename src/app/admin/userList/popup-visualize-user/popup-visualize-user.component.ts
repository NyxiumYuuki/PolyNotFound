import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";



@Component({
  selector: 'app-popup-visualize-user',
  templateUrl: './popup-visualize-user.component.html',
  styleUrls: ['./popup-visualize-user.component.scss']
})
export class PopupVisualizeUserComponent implements OnInit
{
    user;

    constructor( public dialogRef: MatDialogRef<PopupVisualizeUserComponent>,
                 @Inject(MAT_DIALOG_DATA) public data ) { }

    ngOnInit(): void
    {
        this.user = this.data.user;
    }

}
