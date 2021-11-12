import { Component, OnInit } from '@angular/core';
import {User} from "../../../utils/interfaces/user";
import {ThemeService} from "../../../utils/services/theme/theme.service";
import {FictitiousDatasService} from "../../../utils/services/fictitiousDatas/fictitious-datas.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PopupUpdateAdvertiserComponent} from "../popup-update-advertiser/popup-update-advertiser.component";



@Component({
    selector: 'app-page-profil-advertiser',
    templateUrl: './page-profil-advertiser.component.html',
    styleUrls: ['./page-profil-advertiser.component.scss']
})
export class PageProfilAdvertiserComponent implements OnInit
{
    advertiser: User;


    constructor( public themeService: ThemeService,
                 private fictitiousDatasService: FictitiousDatasService,
                 public dialog: MatDialog,
                 private snackBar: MatSnackBar ) { }


    ngOnInit(): void
    {
        this.advertiser = this.fictitiousDatasService.getAdvertiser();
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
