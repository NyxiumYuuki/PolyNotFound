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
    allTitle = [];

    tabOfNewImagesBase64 = [];
    tabOfNewImagesName = [];

    hasError: boolean = false;
    errorMessage: string = "" ;



    constructor( public dialogRef: MatDialogRef<PopupAddOrUpdateAdComponent>,
                 @Inject(MAT_DIALOG_DATA) public data,
                 private messageService: MessageService,
                 public themeService: ThemeService ) { }


    ngOnInit(): void
    {
        this.allVideoCategorie = this.data.allVideoCategorie;
        this.allTitle = this.data.allTitle.slice();
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
            const indexOldTitle = this.allTitle.findIndex(title => title == this.advert.title);
            this.allTitle.splice(indexOldTitle, 1);
        }
    }


    onValidate(): void
    {
        this.checkField();
        if(!this.hasError)
        {
            // preparation des donnees
            this.prepareAdvertInterests();
            this.prepareAdvertImages();

            // si creation
            if (this.data.action === "add")
            {
                this.messageService
                    .post("ad/create", this.advert)
                    .subscribe(ret => this.onCreateCallback(ret), err => this.onCreateCallback(err));
            }
            // si update
            else
            {
                const id = this.advert.id;
                Reflect.deleteProperty(this.advert, "id");
                Reflect.deleteProperty(this.advert, "_id");
                this.messageService
                    .put("ad/update/" + id, this.advert)
                    .subscribe(ret => this.onUpdateCallback(ret, id), err => this.onUpdateCallback(err, id));
            }
        }
    }


    checkField()
    {
        if(this.advert.title.length === 0) {
            this.errorMessage = "Veuillez remplir le champ 'titre'" ;
            this.hasError = true;
        }
        else if(this.allTitle.includes(this.advert.title))
        {
            this.errorMessage = "Ce titre est déjà pris" ;
            this.hasError = true;
        }
        else {
            this.errorMessage = "";
            this.hasError = false;
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
        this.advert.images.splice(index, 1);
    }


    onReceiveNewImages(files: any): void
    {
        this.tabOfNewImagesBase64 = [];
        this.tabOfNewImagesName = [];
        if(files)
        {
            for(let file of files)
            {
                if(file)
                {
                    const reader = new FileReader();
                    reader.onload = this.handleReaderLoaded.bind(this);
                    this.tabOfNewImagesName.push(file.name)
                    reader.readAsBinaryString(file);
                }
            }
        }
    }
    handleReaderLoaded(e)
    {
        this.tabOfNewImagesBase64.push('data:image/png;base64,' + btoa(e.target.result))
    }


    // Met bien en forme les "images" avant d'être envoyer
    prepareAdvertImages(): void
    {
        for(let i=0; i<this.tabOfNewImagesName.length ; i++)
        {
            let newImagePrepared = {
                base64: this.tabOfNewImagesBase64[i],
                url: "",
                description: this.tabOfNewImagesName[i],
                type: 0,
            };
            this.advert.images.push(newImagePrepared);
        }
    }


    // Met bien en forme les "interests" avant d'être envoyer
    prepareAdvertInterests(): void
    {
        let interests = [];

        for (let interest of this.advert.interests) {
            for (let videoCategorie of this.allVideoCategorie) {
                if (videoCategorie.interest === interest) {
                    interests.push(videoCategorie);
                    break;
                }
            }
        }

        this.advert.interests = interests;
    }

}
