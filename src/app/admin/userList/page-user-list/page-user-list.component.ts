import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ThemeService} from "../../../utils/services/theme/theme.service";
import {FictitiousDatasService} from "../../../utils/services/fictitiousDatas/fictitious-datas.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../../utils/interfaces/user";
import {PopupVisualizeUserComponent} from "../popup-visualize-user/popup-visualize-user.component";
import {PopupDeleteUserComponent} from "../popup-delete-user/popup-delete-user.component";



@Component({
    selector: 'app-page-user-list',
    templateUrl: './page-user-list.component.html',
    styleUrls: ['./page-user-list.component.scss']
})
export class PageUserListComponent implements AfterViewInit
{
    displayedColumns: string[];
    displayedColumnsUser: string[] = [ 'login', 'mail', 'dateOfBirth', 'interests', 'createdAt', 'updatedAt', 'delete', 'visualisation' ];
    displayedColumnsAdvertiser: string[] = [ 'login', 'mail', 'createdAt', 'updatedAt', 'isAccepted', 'delete', 'visualisation' ];
    displayedColumnsAdmin: string[] = [ 'login', 'mail', 'createdAt', 'updatedAt', 'delete', 'visualisation' ];

    tabUser: User[] = [];
    tabAdvertiser: User[] = [];
    tabAdmin: User[] = [];

    roleName: string = "user" ;
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
        this.tabUser = this.fictitiousDatasService.getTabUser(32);
        this.tabAdvertiser = this.fictitiousDatasService.getTabAdvertiser(8);
        this.tabAdmin = this.fictitiousDatasService.getTabAdmin(4);

        this.displayedColumns = this.displayedColumnsUser;

        this.dataSource = new MatTableDataSource<User>(this.tabUser);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource = this.dataSource;
    }


    onChangeRoleSelected(roleName: string): void
    {
        if(roleName === "user") {
            this.displayedColumns = this.displayedColumnsUser;
            this.dataSource.data = this.tabUser;
        }
        else if(roleName === "advertiser") {
            this.displayedColumns = this.displayedColumnsAdvertiser;
            this.dataSource.data = this.tabAdvertiser;
        }
        else if(roleName === "admin") {
            this.displayedColumns = this.displayedColumnsAdmin;
            this.dataSource.data = this.tabAdmin;
        }
        this.dataSource = this.dataSource;
    }


    applyFilter(event: Event): void
    {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }


    onVisualize(user: User): void
    {
        const config = {
            width: '50%',
            data: { user: user }
        };
        this.dialog
            .open(PopupVisualizeUserComponent, config)
            .afterClosed()
            .subscribe(retour => {});
    }


    onDelete(user: User): void
    {
        const config = {
            data: { user: user }
        };
        this.dialog
            .open(PopupDeleteUserComponent, config)
            .afterClosed()
            .subscribe( retour => {

                const config = { duration: 1000, panelClass: "custom-class" };
                let message = "" ;
                if((retour === undefined) || (retour === null)) {
                    message = "Opération annulée" ;
                }
                else {
                    const index = this.dataSource.data.findIndex( elt => (elt._id === user._id));
                    this.dataSource.data.splice(index, 1);
                    this.dataSource.data = this.dataSource.data;
                    this.dataSource = this.dataSource;
                    message = "L'annonce a bien été supprimée ✔" ;
                }
                this.snackBar.open( message, "", config);
            });
    }

    onAddAdmin(): void
    {

    }
}
