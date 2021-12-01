import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ThemeService} from "../../../utils/services/theme/theme.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTableDataSource} from "@angular/material/table";
import {Advert} from "../../../utils/interfaces/advert";
import {PopupDeleteAdAdminComponent} from "../popup-delete-ad-admin/popup-delete-ad-admin.component";
import {PopupVisualizeImagesAdminComponent} from "../popup-visualize-images-admin/popup-visualize-images-admin.component";
import {FictitiousAdvertsService} from "../../../utils/services/fictitiousDatas/fictitiousAdverts/fictitious-adverts.service";
import {FormControl} from "@angular/forms";
import {FictitiousUtilsService} from "../../../utils/services/fictitiousDatas/fictitiousUtils/fictitious-utils.service";
import {User} from "../../../utils/interfaces/user";
import {FictitiousUsersService} from "../../../utils/services/fictitiousDatas/fictitiousUsers/fictitious-users.service";



export interface AdvertWithCountViewsAndCompany {
    _id: string,
    userId: string,
    company: string,
    title: string,
    url: string,
    images: {
        url: string,
        description: string,
    }[],
    interests: string[],
    comment: string,
    views: Date[],
    countViews: number,
    isVisible: boolean,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date,
}



@Component({
    selector: 'app-page-ad-list-admin',
    templateUrl: './page-ad-list-admin.component.html',
    styleUrls: ['./page-ad-list-admin.component.scss']
})
export class PageAdListAdminComponent implements AfterViewInit
{
    tabAdvertWithCountViews: AdvertWithCountViewsAndCompany[] = [];
    tabAdvertiser: User[];
    displayedColumns: string[] = [ 'title', 'company', 'interests', 'createdAt', 'updatedAt', 'countViews', 'isVisible', 'actions' ];
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
                 private fictitiousUsersService: FictitiousUsersService,
                 public dialog: MatDialog,
                 private snackBar: MatSnackBar ) { }


    ngAfterViewInit(): void
    {
        // --- FAUX CODE ---
        const tabAdvert = this.fictitiousAdvertsService.getTabAdvert(8);
        this.allInterests = this.fictitiousUtilsService.getTags();
        this.tabAdvertiser = this.fictitiousUsersService.getTabAdvertiser(3);

        for(let advert of tabAdvert) this.tabAdvertWithCountViews.push(this.advertToAdvertWithCountViewsAndCompany(advert));
        this.dataSource = new MatTableDataSource<Advert>();
        this.onFilter();
    }


    applyFilter(event: Event): void
    {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }


    onVisualizeImages(advert: AdvertWithCountViewsAndCompany)
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
            .open(PopupVisualizeImagesAdminComponent, config)
            .afterClosed()
            .subscribe(retour => {});
    }


    onDelete(advert: AdvertWithCountViewsAndCompany): void
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
                    message = advert.title + " a bien été supprimée ✔" ;
                }
                this.snackBar.open( message, "", config);
            });
    }


    onFilter(): void
    {
        this.dataSource.data = [];
        for(let advert of this.tabAdvertWithCountViews)
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


    advertToAdvertWithCountViewsAndCompany(advert: Advert): AdvertWithCountViewsAndCompany
    {
        let company0 = "company" ;
        for(let advertiser of this.tabAdvertiser)
        {
            if(advert.userId === advertiser._id) {
                company0 = advertiser.company;
                break;
            }
        }

        return {
            _id: advert._id,
            userId: advert.userId,
            title: advert.title,
            company: company0,
            url: advert.url,
            images: advert.images,
            interests: advert.interests,
            comment: advert.comment,
            views: advert.views,
            countViews: advert.views.length,
            isVisible: advert.isVisible,
            isActive: advert.isActive,
            createdAt: advert.createdAt,
            updatedAt: advert.updatedAt,
        }
    }

}
