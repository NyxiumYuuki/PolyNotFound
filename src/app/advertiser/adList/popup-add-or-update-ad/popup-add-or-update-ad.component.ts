import {Component, Inject, OnInit} from '@angular/core';
import {Advert} from "../../../utils/interfaces/advert";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MessageService} from "../../../utils/services/message/message.service";
import {ThemeService} from "../../../utils/services/theme/theme.service";


const ADVERT_VIDE: Advert = {
    _id: "",
    userId: "",
    title: "",
    url: "",
    images: [],
    interests: [],
    comment: "",
    views: [],
    isVisible: true,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
}


@Component({
  selector: 'app-popup-add-or-update-ad',
  templateUrl: './popup-add-or-update-ad.component.html',
  styleUrls: ['./popup-add-or-update-ad.component.scss']
})
export class PopupAddOrUpdateAdComponent implements OnInit
{
    advert: any;
    title: string = "" ;
    allVideoCategorie = [];
    tabWaitingFile: File[] = []; // fichiers selectionnés mais pas encore "validés"
    tabSelectedFile: File[] = []; // fichier "validés"
    _event;


    constructor( public dialogRef: MatDialogRef<PopupAddOrUpdateAdComponent>,
                 @Inject(MAT_DIALOG_DATA) public data,
                 private messageService: MessageService,
                 public themeService: ThemeService ) { }


    ngOnInit(): void
    {
        this.allVideoCategorie = this.data.allVideoCategorie
        if(this.data.action === "add")
        {
            this.advert = Object.assign({}, ADVERT_VIDE);
            this.advert.interests = [];
            this.title = "Ajouter annonce" ;
        }
        else
        {
            this.advert = Object.assign({}, this.data.advert);
            this.advert.interests = this.data.advert.interests.slice();
            this.title = "Modifier annonce" ;
        }
    }


    onValidate(): void
    {
        // On transforme 'this.user.interests' en tableau de 'videoCategorie'
        let interests = []; // tableau de videoCategorie
        for(let interest of this.advert.interests)
        {
            for(let videoCategorie of this.allVideoCategorie)
            {
                if(videoCategorie.interest === interest) {
                    interests.push(videoCategorie);
                    break;
                }
            }
        }
        this.advert.interests = interests;

        if(this.data.action === "add")
        {
            this.messageService
                .post("ad/create", this.advert)
                .subscribe(ret => this.onCreateCallback(ret), err => this.onCreateCallback(err));
        }
        else {
            const id = this.advert.id;
            Reflect.deleteProperty(this.advert, "id");
            Reflect.deleteProperty(this.advert, "_id");
            this.messageService
                .put("ad/update/"+id, this.advert)
                .subscribe(ret => this.onUpdateCallback(ret,id), err => this.onUpdateCallback(err,id));
        }
    }


    onCreateCallback(retour: any): void
    {
        if(retour.status !== "success") {
            console.log(retour);
            this.dialogRef.close();
        }
        else {
            this.dialogRef.close(retour.data);
        }
    }


    onUpdateCallback(retour: any, id: string): void
    {
        if(retour.status !== "success") {
            console.log(retour);
            this.dialogRef.close();
        }
        else {
            this.advert.id = id;
            this.dialogRef.close(this.advert);
        }
    }


    onEventInputTags(myTags: string[]): void
    {
        this.advert.interests = myTags;
    }


    onRemoveImgAlreadyPresent(image)
    {
        const index = this.advert.images.indexOf(image);
        console.log("idx: " + index);
        this.advert.images.slice(index, 1);
    }

}
