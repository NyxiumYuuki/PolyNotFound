import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PopupUpdateAdvertiserComponent} from "../popup-update-advertiser/popup-update-advertiser.component";
import {ThemeService} from "../../../utils/theme/theme.service";
import {MessageService} from "../../../utils/message/message.service";
import {ProfilService} from "../../../utils/profil/profil.service";



@Component({
    selector: 'app-page-profil-advertiser',
    templateUrl: './page-profil-advertiser.component.html',
    styleUrls: ['./page-profil-advertiser.component.scss']
})
export class PageProfilAdvertiserComponent implements OnInit
{
    advertiser = {
        _id: "",
        login: "",
        hashPass: "",
        email: "",
        role: {
            name: "advertiser",
            permission: 5,
            isAccepted: true,
        },
        profileImageUrl: "",
        dateOfBirth: null,
        gender: "man",
        interests: [],
        company: "",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastConnexion: null
    };


    constructor( public themeService: ThemeService,
                 public dialog: MatDialog,
                 private snackBar: MatSnackBar,
                 private messageService: MessageService,
                 private profilService: ProfilService ) { }


    ngOnInit(): void
    {
        this.messageService
            .get( "user/findOne/"+this.profilService.getId())
            .subscribe( retour => this.ngOnInitCallback(retour), err => this.ngOnInitCallback(err) )
    }


    ngOnInitCallback(retour: any)
    {
        if(retour.status !== "success") {
            console.log(retour);
        }
        else {
            this.advertiser = retour.data;
        }
    }


    onModifier()
    {
        const config = {
            width: '25%',
            data: { advertiser: this.advertiser }
        };
        this.dialog
            .open(PopupUpdateAdvertiserComponent, config)
            .afterClosed()
            .subscribe(retour => {

                if((retour === null) || (retour === undefined))
                {
                    const config = { duration: 1000, panelClass: "custom-class" };
                    this.snackBar.open( "Opération annulé", "", config);
                }
                else
                {
                    this.advertiser = retour;
                }
            });
    }

}
