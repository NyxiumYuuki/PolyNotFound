import {Component, Inject, OnInit} from '@angular/core';
import {Advert} from "../../../utils/interfaces/advert";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MessageService} from "../../../utils/services/message/message.service";
import {ThemeService} from "../../../utils/services/theme/theme.service";


const ADVERT_VIDE: Advert = {
    _id: "",
    userId: "",
    title: "",
    advertiser: "",
    images: [],
    tags: [],
    comment: "",
    views: 0,
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
    advert: Advert;
    urlBackend: string = "" ;
    title: string = "" ;
    tabWaitingFile: File[] = []; // fichiers selectionnés mais pas encore "validés"
    tabSelectedFile: File[] = []; // fichier "validés"
    _event;


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


    onEventInputTags(myTags: string[]): void
    {
        this.advert.tags = myTags;
    }


    // Lorsque l'annonceur selectionne des fichiers
    onSelectFile(event)
    {
        const nbFileSelected = event.target.files.length ;
        for(let i=0 ; i<nbFileSelected ; i++) this.tabWaitingFile.push(event.target.files[i]);
        this._event = event;
    }

    // Lorsque l'annonceur "valide" sont choix de fichier selectionné
    onValidateFiles(): void
    {
        const nbFile = this.tabWaitingFile.length;
        for(let i=0 ; i<nbFile ; i++) this.tabSelectedFile.push(this.tabWaitingFile[i]);
        this.tabWaitingFile = [];
        this._event.target.value = "";
    }

    // Lorsque l'annonceur souhaite supprimer un fichier "validé"
    onDeleteFile(file: File)
    {
        const index = this.tabSelectedFile.findIndex(x => file);
        this.tabSelectedFile.splice(index, 1);
    }

}
