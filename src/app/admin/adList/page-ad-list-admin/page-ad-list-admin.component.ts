import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ThemeService} from "../../../utils/services/theme/theme.service";
import {FictitiousDatasService} from "../../../utils/services/fictitiousDatas/fictitious-datas.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTableDataSource} from "@angular/material/table";
import {Advert} from "../../../utils/interfaces/advert";
import {PopupVisualizeAdAdminComponent} from "../popup-visualize-ad-admin/popup-visualize-ad-admin.component";
import {PopupDeleteAdAdminComponent} from "../popup-delete-ad-admin/popup-delete-ad-admin.component";



@Component({
    selector: 'app-page-ad-list-admin',
    templateUrl: './page-ad-list-admin.component.html',
    styleUrls: ['./page-ad-list-admin.component.scss']
})
export class PageAdListAdminComponent implements AfterViewInit
{
    displayedColumns: string[] = [ 'title', 'advertiser', 'tags', 'createdAt', 'updatedAt', 'views', 'isVisible', 'delete', 'visualisation' ];
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
            .open(PopupVisualizeAdAdminComponent, config)
            .afterClosed()
            .subscribe(retour => {});
    }


    onDelete(advert: Advert): void
    {
        const config = {
            data: { advert: advert }
        };
        this.dialog
            .open(PopupDeleteAdAdminComponent, config)
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
