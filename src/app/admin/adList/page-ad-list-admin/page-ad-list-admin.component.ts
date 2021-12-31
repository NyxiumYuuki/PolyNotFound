import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTableDataSource} from "@angular/material/table";
import {PopupDeleteAdAdminComponent} from "../popup-delete-ad-admin/popup-delete-ad-admin.component";
import {PopupVisualizeImagesAdminComponent} from "../popup-visualize-images-admin/popup-visualize-images-admin.component";
import {FormControl, FormGroup} from "@angular/forms";
import {HttpParams} from "@angular/common/http";
import {ThemeService} from "../../../utils/theme/theme.service";
import {MessageService} from "../../../utils/message/message.service";
import {DatePipe} from "@angular/common";



export interface AdvertWithCountViewsAndCompany {
    id: string,
    userId: string,
    company: string,
    email: string,
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
    tabAdvertiser: any[];
    displayedColumns: string[] = [ 'title', 'company', 'email', 'interests', 'createdAt', 'updatedAt', 'countViews', 'isVisible', 'actions' ];
    dataSource ;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    filteredText: string = "" ;
    visible: boolean = true;
    noVisible: boolean = true;
    campaignOne = new FormGroup({
        start: new FormControl(null),
        end: new FormControl(null),
    });
    formControlInterests = new FormControl();
    allInterests: string[] = [];


    constructor( public themeService: ThemeService,
                 public dialog: MatDialog,
                 private snackBar: MatSnackBar,
                 private messageService: MessageService) { }


    ngAfterViewInit(): void
    {
        // Ask for ads and then for advertiser
        let params = new HttpParams();
        params = params.append("isActive", true);
        this.messageService
            .get("ad/findAll", params)
            .subscribe(ret => this.afterReceivingAds(ret), err => this.afterReceivingAds(err) );

        // Ask for interest
        this.messageService
            .get("misc/getInterests")
            .subscribe(ret => this.afterReceivingInterests(ret), err => this.afterReceivingInterests(err) );
    }


    afterReceivingAds(retour: any): void
    {
        if(retour.status !== "success") {
            console.log(retour);
        }
        else {
            const tabAdvert = retour.data;
            this.messageService
                .get("user/findAll")
                .subscribe(ret => this.afterReceivingAdvertiser(ret, tabAdvert), err => this.afterReceivingAdvertiser(err, tabAdvert) );
        }
    }


    afterReceivingAdvertiser(retour: any, tabAdvert): void
    {
        if(retour.status !== "success") {
            console.log(retour);
        }
        else {
            this.tabAdvertiser = retour.data.filter(x => x.role.name === "advertiser");
            for(let advert of tabAdvert) this.tabAdvertWithCountViews.push(this.advertToAdvertWithCountViewsAndCompany(advert));
            this.dataSource = new MatTableDataSource<any>();
            this.onFilter();
        }
    }


    afterReceivingInterests(retour: any): void
    {
        if(retour.status !== "success") {
            console.log(retour);
        }
        else {
            this.allInterests = retour.data.map(x => x.interest);
            this.allInterests.sort();
        }
    }


    onVisualizeImages(advert: AdvertWithCountViewsAndCompany)
    {
        if(advert.images.length !== 0)
        {
            const config = {
                width: '30%',
                height: '90%',
                data: { images: advert.images }
            };
            this.dialog
                .open(PopupVisualizeImagesAdminComponent, config)
                .afterClosed()
                .subscribe(retour => {});
        }
        else {
            const config = { duration: 2000, panelClass: "custom-class" };
            const message = "Cette annonce ne contient aucune image" ;
            this.snackBar.open( message, "", config);
        }
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
                    const index = this.dataSource.data.findIndex( elt => (elt.id === advert.id));
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
        const startDate = this.campaignOne.get("start").value;
        const endDate = this.campaignOne.get("end").value;

        this.dataSource.data = [];
        for(let advert of this.tabAdvertWithCountViews)
        {
            // filtre textuelle
            let valide: boolean = this.isTextFiltrationValid(advert);;

            // filtre actif
            if(valide)
            {
                if(advert.isVisible && this.visible) valide = true;
                else if((!advert.isVisible) && this.noVisible) valide = true;
                else valide = false;
            }

            // filtre date
            if(valide)
            {
                if ((advert.createdAt === null) && (startDate !== null)) valide = false;
                else if ((advert.createdAt === null) && (endDate !== null)) valide = false;
                else if (startDate !== null)
                {
                    let timeCreatedAt = 0;
                    if(advert.createdAt !== null) timeCreatedAt = (new Date(advert.createdAt)).getTime();

                    if(startDate.getTime() > timeCreatedAt) valide = false;
                    else if (endDate !== null)
                    {
                        if(endDate.getTime() < timeCreatedAt) valide = false;
                    }
                }
            }

            // filtre interests
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


    isTextFiltrationValid(advert): boolean
    {
        let datePipe = new DatePipe('en-GB');
        if(advert.title.includes(this.filteredText)) return true;
        if(advert.company.includes(this.filteredText)) return true;
        if(advert.email.includes(this.filteredText)) return true;
        const createdAt = datePipe.transform(new Date(advert.createdAt), 'dd/MM/yyyy à HH:mm:ss');
        if(createdAt.includes(this.filteredText)) return true;
        const updatedAt = datePipe.transform(new Date(advert.updatedAt), 'dd/MM/yyyy à HH:mm:ss');
        if(updatedAt.includes(this.filteredText)) return true;
        if(advert.countViews.toString().includes(this.filteredText)) return true;
        return false;
    }


    advertToAdvertWithCountViewsAndCompany(advert): AdvertWithCountViewsAndCompany
    {
        let company0 = "company" ;
        let email0 = "email" ;
        for(let advertiser of this.tabAdvertiser)
        {
            if(advert.userId === advertiser.id) {
                company0 = advertiser.company;
                email0 = advertiser.email;
                break;
            }
        }

        return {
            id: advert.id,
            userId: advert.userId,
            title: advert.title,
            company: company0,
            email: email0,
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


    onEffacerDate(): void {
        this.campaignOne.setValue({start: null, end: null });
        this.onFilter();
    }

}
