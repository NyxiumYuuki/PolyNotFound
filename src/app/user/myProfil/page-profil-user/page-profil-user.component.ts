import { Component, OnInit } from '@angular/core';
import {ThemeService} from "../../../utils/services/theme/theme.service";
import {User} from "../../../utils/interfaces/user";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PopupUpdateUserComponent} from "../popup-update-user/popup-update-user.component";
import {FictitiousUsersService} from "../../../utils/services/fictitiousDatas/fictitiousUsers/fictitious-users.service";



@Component({
    selector: 'app-page-profil-user',
    templateUrl: './page-profil-user.component.html',
    styleUrls: ['./page-profil-user.component.scss']
})
export class PageProfilUserComponent implements OnInit
{
    user: User;


    constructor( public themeService: ThemeService,
                 private fictitiousUsersService: FictitiousUsersService,
                 public dialog: MatDialog,
                 private snackBar: MatSnackBar ) { }


    ngOnInit(): void
    {
        this.user = this.fictitiousUsersService.getUser();
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
