import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {ThemeService} from "../../../utils/services/theme/theme.service";
import {MatTableDataSource} from "@angular/material/table";
import {Advert} from "../../../utils/interfaces/advert";
import {MatDialog} from "@angular/material/dialog";
import {PopupAddOrUpdateAdComponent} from "../popup-add-or-update-ad/popup-add-or-update-ad.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PopupDeleteAdAdvertiserComponent} from "../popup-delete-ad-advertiser/popup-delete-ad-advertiser.component";
import {PopupVisualizeAdAdvertiserComponent} from "../popup-visualize-ad-advertiser/popup-visualize-ad-advertiser.component";
import {MatPaginator} from "@angular/material/paginator";
import {PopupVisualizeImagesAdvertiserComponent} from "../popup-visualize-images-advertiser/popup-visualize-images-advertiser.component";
import {FictitiousAdvertsService} from "../../../utils/services/fictitiousDatas/fictitiousAdverts/fictitious-adverts.service";
import {FormControl} from "@angular/forms";
import {FictitiousUtilsService} from "../../../utils/services/fictitiousDatas/fictitiousUtils/fictitious-utils.service";



@Component({
    selector: 'app-page-ad-list-advertiser',
    templateUrl: './page-ad-list-advertiser.component.html',
    styleUrls: ['./page-ad-list-advertiser.component.scss']
})
export class PageAdListAdvertiserComponent implements AfterViewInit
{
    displayedColumns: string[] = [ 'isVisible', 'title', 'interests', 'createdAt', 'updatedAt', 'views', 'actions' ];
    tabAdvert: Advert[] = [];
    dataSource ;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    visible: boolean = true;
    noVisible: boolean = true;
    startDate: Date = null;
    endDate: Date = null;
    formControlInterests = new FormControl();
    allInterests: string[] = [];


    constructor( public themeService: ThemeService,
                 private fictitiousAdvertsService: FictitiousAdvertsService,
                 private fictitiousUtilsService: FictitiousUtilsService,
                 public dialog: MatDialog,
                 private snackBar: MatSnackBar ) { }


    ngAfterViewInit(): void
    {
        // --- FAUX CODE ---
        this.tabAdvert = this.fictitiousAdvertsService.getTabAdvert(8);
        this.allInterests = this.fictitiousUtilsService.getTags();

        this.dataSource = new MatTableDataSource<Advert>();
        this.onFilter();
    }


    applyFilter(event: Event): void
    {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }


    onVisualizeImages(advert: Advert)
    {
        const config = {
            width: '30%',
            height: '90%',
            data: {
                images: advert.images,
                width: 300,
                height: 800,
            }
        };
        this.dialog
            .open(PopupVisualizeImagesAdvertiserComponent, config)
            .afterClosed()
            .subscribe(retour => {});
    }


    onVisualize(advert: Advert): void
    {
        const config = {
            width: '50%',
            data: { advert: advert }
        };
        this.dialog
            .open(PopupVisualizeAdAdvertiserComponent, config)
            .afterClosed()
            .subscribe(retour => {});
    }


    onAdd(): void
    {
        const config = {
            width: '75%',
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
            width: '75%',
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
            .open(PopupDeleteAdAdvertiserComponent, config)
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
                    message = advert.title + " a bien été supprimée ✔" ;
                }
                this.snackBar.open( message, "", config);
            });
    }


    onFilter(): void
    {
        console.log("b:" + this.formControlInterests.value);
        this.dataSource.data = [];
        for(let advert of this.tabAdvert)
        {
            let valide: boolean = true;

            if(advert.isVisible && this.visible) valide = true;
            else if((!advert.isVisible) && this.noVisible) valide = true;
            else valide = false;

            if(valide)
            {
                if ((advert.createdAt === null) && (this.startDate !== null)) valide = false;
                else if ((advert.createdAt === null) && (this.endDate !== null)) valide = false;
                else if (this.startDate !== null)
                {
                    if(this.startDate.getTime() > advert.createdAt.getTime()) valide = false;
                    else if (this.endDate !== null)
                    {
                        if(this.endDate.getTime() < advert.createdAt.getTime()) valide = false;
                    }
                }
            }

            if(valide) {
                if(this.formControlInterests.value !== null) {
                    for (let interest of this.formControlInterests.value) {
                        if (advert.interests.indexOf(interest) === -1) {
                            valide = false;
                            break;
                        }
                    }
                }
            }

            if(valide) this.dataSource.data.push(advert);
        }

        this.dataSource = new MatTableDataSource(this.dataSource.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }


    onNewStartDate(event): void {
        this.startDate = new Date(event);
    }

    onNewEndDate(event): void {
        this.endDate = new Date(event);
    }


    onSliderIsVisible(advert: Advert): void
    {
        // il faut envoyer la négation de user.isActive
    }

}
