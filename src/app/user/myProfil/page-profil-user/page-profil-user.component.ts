import { Component, OnInit } from '@angular/core';
import {ThemeService} from "../../../utils/services/theme/theme.service";
import {FictitiousDatasService} from "../../../utils/services/fictitiousDatas/fictitious-datas.service";
import {User} from "../../../utils/interfaces/user";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PopupUpdateUserComponent} from "../popup-update-user/popup-update-user.component";



@Component({
    selector: 'app-page-profil-user',
    templateUrl: './page-profil-user.component.html',
    styleUrls: ['./page-profil-user.component.scss']
})
export class PageProfilUserComponent implements OnInit
{
    user: User;


    constructor( public themeService: ThemeService,
                 private fictitiousDatasService: FictitiousDatasService,
                 public dialog: MatDialog,
                 private snackBar: MatSnackBar ) { }


    ngOnInit(): void
    {
        this.user = this.fictitiousDatasService.getUser();
    }


    onModifier()
    {
        const config = {
            width: '35%',
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
