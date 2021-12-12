import { Component, OnInit } from '@angular/core';
import {ThemeService} from "../../../utils/services/theme/theme.service";
import {User} from "../../../utils/interfaces/user";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PopupUpdateUserComponent} from "../popup-update-user/popup-update-user.component";
import {MessageService} from "../../../utils/services/message/message.service";
import {ProfilService} from "../../../utils/services/profil/profil.service";



@Component({
    selector: 'app-page-profil-user',
    templateUrl: './page-profil-user.component.html',
    styleUrls: ['./page-profil-user.component.scss']
})
export class PageProfilUserComponent implements OnInit
{
    user: User = {
        _id: "",
        login: "",
        hashPass: "",
        email: "",
        role: {
            name: "user",
            permission: 0,
            isAccepted: false,
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
            .get( "user/findOne/"+this.profilService.id)
            .subscribe( retour => this.ngOnInitCallback(retour), err => this.ngOnInitCallback(err) )
    }


    ngOnInitCallback(retour: any)
    {
        if(retour.status !== "success") {
            console.log(retour);
        }
        else {
            this.user = retour.data;
            this.profilService.id = retour.data.id;
        }
    }


    onModifier()
    {
        const config = {
            width: '70%',
            data: { user: this.user }
        };
        this.dialog
            .open(PopupUpdateUserComponent, config)
            .afterClosed()
            .subscribe(retour => {

                if((retour === null) || (retour === undefined))
                {
                    const config = { duration: 1000, panelClass: "custom-class" };
                    this.snackBar.open( "Opération annulé", "", config);
                }
                else
                {
                    this.user = retour;
                }
            });
    }

}
