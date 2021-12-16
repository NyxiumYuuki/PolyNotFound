import { Component, OnInit } from '@angular/core';
import {User} from "../../../utils/interfaces/user";
import {ThemeService} from "../../../utils/services/theme/theme.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PopupUpdateAdminComponent} from "../popup-update-admin/popup-update-admin.component";
import {MessageService} from "../../../utils/services/message/message.service";
import {ProfilService} from "../../../utils/services/profil/profil.service";



@Component({
    selector: 'app-page-profil-admin',
    templateUrl: './page-profil-admin.component.html',
    styleUrls: ['./page-profil-admin.component.scss']
})
export class PageProfilAdminComponent implements OnInit
{
    admin: User = {
        _id: "",
        login: "",
        hashPass: "",
        email: "",
        role: {
            name: "admin",
            permission: 10,
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
            this.admin = retour.data;
        }
    }


    onModifier()
    {
        const config = {
            width: '25%',
            data: { admin: this.admin }
        };
        this.dialog
            .open(PopupUpdateAdminComponent, config)
            .afterClosed()
            .subscribe(retour => {

                if((retour === null) || (retour === undefined))
                {
                    const config = { duration: 1000, panelClass: "custom-class" };
                    this.snackBar.open( "Opération annulé", "", config);
                }
                else
                {
                    this.admin = retour;
                }
            });
    }

}
