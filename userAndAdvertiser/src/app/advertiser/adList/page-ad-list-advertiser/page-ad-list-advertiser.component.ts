import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {PopupAddOrUpdateAdComponent} from "../popup-add-or-update-ad/popup-add-or-update-ad.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PopupDeleteAdAdvertiserComponent} from "../popup-delete-ad-advertiser/popup-delete-ad-advertiser.component";
import {MatPaginator} from "@angular/material/paginator";
import {PopupVisualizeImagesAdvertiserComponent} from "../popup-visualize-images-advertiser/popup-visualize-images-advertiser.component";
import {FormControl} from "@angular/forms";
import {HttpParams} from "@angular/common/http";
import {ThemeService} from "../../../utils/theme/theme.service";
import {MessageService} from "../../../utils/message/message.service";



@Component({
    selector: 'app-page-ad-list-advertiser',
    templateUrl: './page-ad-list-advertiser.component.html',
    styleUrls: ['./page-ad-list-advertiser.component.scss']
})
export class PageAdListAdvertiserComponent implements AfterViewInit
{
    displayedColumns: string[] = [ 'isVisible', 'title', 'interests', 'createdAt', 'updatedAt', 'countViews', 'actions' ];
    tabAdvertWithCountViews: any[] = [];
    dataSource;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    visible: boolean = true;
    noVisible: boolean = true;
    startDate: Date = null;
    endDate: Date = null;
    formControlInterests = new FormControl();

    allVideoCategorie = [];
    allInterests: string[] = [];


    constructor( public themeService: ThemeService,
                 public dialog: MatDialog,
                 private snackBar: MatSnackBar,
                 private messageService: MessageService ) { }


    ngAfterViewInit(): void
    {
        // Ask interests
        this.messageService
            .get("misc/getInterests")
            .subscribe(ret => this.afterReceivingInterests(ret), err => this.afterReceivingInterests(err) );

        // Ask ads
        let params = new HttpParams();
        params = params.append("isActive", true);
        this.messageService
            .get("ad/findAll", params)
            .subscribe(ret => this.afterReceivingAds(ret), err => this.afterReceivingAds(err));
    }


    afterReceivingInterests(retour: any): void
    {
        if(retour.status !== "success") {
            console.log("afterReceivingInterests");
            console.log(retour);
        }
        else {
            this.allVideoCategorie = retour.data;
            this.allInterests = retour.data.map(x => x.interest);
            this.allInterests.sort();
        }
    }


    afterReceivingAds(retour: any): void
    {
        if(retour.status !== "success") {
            console.log(retour);
        }
        else {
            if(retour.data.length !== 0)
            {
                for(let advert of retour.data) this.tabAdvertWithCountViews.push(this.advertToAdvertWithCountViews(advert));
                this.dataSource = new MatTableDataSource<any>();
                this.onFilter();
            }
        }
    }


    applyFilter(event: Event): void
    {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }


    onVisualizeImages(advert: any)
    {
        if(advert.images.length !== 0)
        {
            const config = {
                width: '30%',
                height: '90%',
                data: { images: advert.images }
            };
            this.dialog
                .open(PopupVisualizeImagesAdvertiserComponent, config)
                .afterClosed()
                .subscribe(retour => {});
        }
        else {
            const config = { duration: 2000, panelClass: "custom-class" };
            const message = "Cette annonce ne contient aucune image" ;
            this.snackBar.open( message, "", config);
        }
    }


    onAdd(): void
    {
        const config = {
            width: '75%',
            //height: '80%',
            panelClass: 'custom-dialog-container',
            data: {
                action: "add",
                advert: null,
                allVideoCategorie: this.allVideoCategorie,
                allTitle: this.tabAdvertWithCountViews.map(x => x.title)
            }
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
                    this.tabAdvertWithCountViews.push(this.advertToAdvertWithCountViews(advertAdded));
                    this.onFilter();
                    message = "L'annonce a bien été ajoutée ✔" ;
                }
                this.snackBar.open( message, "", config);
            });
    }


    onUpdate(advertToUpdate: any): void
    {
        const config = {
            width: '75%',
            //height: '80%',
            panelClass: 'custom-dialog-container',
            data: {
                action: "update",
                advert: advertToUpdate,
                allVideoCategorie: this.allVideoCategorie,
                allTitle: this.tabAdvertWithCountViews.map(x => x.title)
            }
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
                    const index = this.tabAdvertWithCountViews.findIndex(elt => (elt.id === advertToUpdate.id));
                    this.tabAdvertWithCountViews.splice(index, 1, this.advertToAdvertWithCountViews(advertUpdated));
                    this.onFilter();
                    message = "L'annonce a bien été modifiée ✔" ;
                }
                this.snackBar.open( message, "", config);
            });
    }


    onDelete(advert: any): void
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
        if(this.dataSource === null || this.dataSource === undefined) this.dataSource = new MatTableDataSource();
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


    onSliderIsVisible(advert: any): void
    {
        // il faut envoyer la négation de user.isActive
        this.messageService
            .put("ad/update/"+advert.id, { isVisible: !advert.isVisible })
            .subscribe(
                ret => {},
                err => {
                    console.log("onSliderIsVisible");
                    console.log(err);
                }
            );
    }


    advertToAdvertWithCountViews(advert)
    {
        return {
            id: advert.id,
            userId: advert.userId,
            title: advert.title,
            url: advert.url,
            images: advert.images,
            interests: advert.interests.map(x => x.interest),
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