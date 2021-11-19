import { Component, OnInit } from '@angular/core';
import {User} from "../../../utils/interfaces/user";
import {ThemeService} from "../../../utils/services/theme/theme.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PopupUpdateAdminComponent} from "../popup-update-admin/popup-update-admin.component";
import {FictitiousUsersService} from "../../../utils/services/fictitiousDatas/fictitiousUsers/fictitious-users.service";



@Component({
    selector: 'app-page-profil-admin',
    templateUrl: './page-profil-admin.component.html',
    styleUrls: ['./page-profil-admin.component.scss']
})
export class PageProfilAdminComponent implements OnInit
{

    admin: User;


    constructor( public themeService: ThemeService,
                 private fictitiousUsersService: FictitiousUsersService,
                 public dialog: MatDialog,
                 private snackBar: MatSnackBar ) { }


    ngOnInit(): void
    {
        this.admin = this.fictitiousUsersService.getAdmin();
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
