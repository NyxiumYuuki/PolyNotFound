import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {ThemeService} from "../../../utils/services/theme/theme.service";
import {FictitiousDatasService} from "../../../utils/services/fictitiousDatas/fictitious-datas.service";
import {MatTableDataSource} from "@angular/material/table";
import {Advert} from "../../../utils/interfaces/advert";
import {MatDialog} from "@angular/material/dialog";
import {PopupAddOrUpdateAdComponent} from "../popup-add-or-update-ad/popup-add-or-update-ad.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PopupDeleteAdComponent} from "../popup-delete-ad/popup-delete-ad.component";
import {PopupVisualizeAdComponent} from "../popup-visualize-ad/popup-visualize-ad.component";
import {MatPaginator} from "@angular/material/paginator";



@Component({
  selector: 'app-page-advertiser',
  templateUrl: './page-advertiser.component.html',
  styleUrls: ['./page-advertiser.component.scss']
})
export class PageAdvertiserComponent implements AfterViewInit
{
    displayedColumns: string[] = [ 'title', 'tags', 'createdAt', 'lastUpdate', 'views', 'isVisible', 'update', 'delete', 'visualisation' ];
    dataSource ;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;


    constructor( public themeService: ThemeService,
                 private fictitiousDatasService: FictitiousDatasService,
                 public dialog: MatDialog,
                 private snackBar: MatSnackBar ) { }


    ngAfterViewInit(): void
    {
        // --- FAUX CODE ---
        const tabAdvert = this.fictitiousDatasService.getTabAdvert(8);
        this.dataSource = new MatTableDataSource<Advert>(tabAdvert);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource = this.dataSource;
    }


    applyFilter(event: Event): void
    {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }


    onVisualize(advert: Advert): void
    {
        const config = {
            width: '50%',
            data: { advert: advert }
        };
        this.dialog
            .open(PopupVisualizeAdComponent, config)
            .afterClosed()
            .subscribe(retour => {});
    }


    onAdd(): void
    {
        const config = {
            width: '40%',
            height: '80%',
            data: { action: "add", advert: null }
        };
        this.dialog
            .open(PopupAddOrUpdateAdComponent, config)
            .afterClosed()
            .subscribe( advertAdded => {

                const config = { duration: 1000, panelClass: "custom-class" };
                let message = "" ;
                if((advertAdded === undefined) || (advertAdded === null)) {
                    message = "Opération annulée" ;
                }
                else {
                    this.dataSource.data.push(advertAdded);
                    this.dataSource.data = this.dataSource.data;
                    this.dataSource = this.dataSource;
                    message = "L'annoonce a bien été ajoutée ✔"
                }
                this.snackBar.open( message, "", config);
            });
    }


    onUpdate(advertToUpdate: Advert): void
    {
        const config = {
            width: '40%',
            height: '80%',
            data: { action: "update", advert: advertToUpdate }
        };
        this.dialog
            .open(PopupAddOrUpdateAdComponent, config)
            .afterClosed()
            .subscribe( advertUpdated => {

                const config = { duration: 1000, panelClass: "custom-class" };
                let message = "" ;
                if((advertUpdated === undefined) || (advertUpdated === null)) {
                    message = "Opération annulée" ;
                }
                else {
                    const index = this.dataSource.data.findIndex( elt => (elt._id === advertToUpdate._id));
                    this.dataSource.data.splice(index, 1, advertUpdated);
                    this.dataSource.data = this.dataSource.data;
                    this.dataSource = this.dataSource;
                    message = "L'annonce a bien été modifiée ✔"
                }
                this.snackBar.open( message, "", config);
            });
    }


    onDelete(advert: Advert): void
    {
        const config = {
            data: { advert: advert }
        };
        this.dialog
            .open(PopupDeleteAdComponent, config)
            .afterClosed()
            .subscribe( retour => {

                const config = { duration: 1000, panelClass: "custom-class" };
                let message = "" ;
                if((retour === undefined) || (retour === null)) {
                    message = "Opération annulée" ;
                }
                else {
                    const index = this.dataSource.data.findIndex( elt => (elt._id === advert._id));
                    this.dataSource.data.splice(index, 1);
                    this.dataSource.data = this.dataSource.data;
                    this.dataSource = this.dataSource;
                    message = "L'annonce a bien été supprimée ✔" ;
                }
                this.snackBar.open( message, "", config);
            });
    }

}
