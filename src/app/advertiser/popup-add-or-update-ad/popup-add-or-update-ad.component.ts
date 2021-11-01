import {Component, Inject, OnInit} from '@angular/core';
import {Advert} from "../../utils/interfaces/advert";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MessageService} from "../../utils/services/message/message.service";
import {ThemeService} from "../../utils/services/theme/theme.service";


const ADVERT_VIDE = {
    _id: "",
    title: "",
    advertiser: "",
    images: [],
    tags: [],
    comment: "",
    views: 0,
    createdAt: new Date(),
    lastUpdate: new Date(),
    isVisible: true,
}


@Component({
  selector: 'app-popup-add-or-update-ad',
  templateUrl: './popup-add-or-update-ad.component.html',
  styleUrls: ['./popup-add-or-update-ad.component.scss']
})
export class PopupAddOrUpdateAdComponent implements OnInit
{
    advert: Advert;
    urlBackend: string = "" ;
    title: string = "" ;


    constructor( public dialogRef: MatDialogRef<PopupAddOrUpdateAdComponent>,
                 @Inject(MAT_DIALOG_DATA) public data,
                 private messageService: MessageService,
                 public themeService: ThemeService ) { }


    ngOnInit(): void
    {
        if(this.data.action === "add")
        {
            this.advert = Object.assign({}, ADVERT_VIDE);
            this.advert.tags = [];
            this.urlBackend = "advertiser/add/ad" ;
            this.title = "Ajouter annonce" ;
        }
        else
        {
            this.advert = Object.assign({}, this.data.advert);
            this.advert.tags = this.data.advert.tags.slice();
            this.urlBackend = "advertiser/update/ad" ;
            this.title = "Modifier annonce" ;
        }
    }


    onValidate(): void
    {
        // --- FAUX CODE ---
        this.dialogRef.close(this.advert);

        // --- VRAI CODE ---
        /*
        this.messageService
            .sendMessage(this.urlBackend, this.advert)
            .subscribe( retour => {

                if(retour.status === "error") {
                    console.log(retour);
                    this.dialogRef.close(this.advert);
                }
                else {
                    this.dialogRef.close(retour.data.advert);
                }
            });
        */
    }


    onEventBarTags(myTags: string[])
    {
        this.advert.tags = myTags;
    }

}
