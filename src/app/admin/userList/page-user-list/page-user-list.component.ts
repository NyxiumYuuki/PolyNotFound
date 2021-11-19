import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ThemeService} from "../../../utils/services/theme/theme.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../../utils/interfaces/user";
import {PopupVisualizeUserComponent} from "../popup-visualize-user/popup-visualize-user.component";
import {PopupDeleteUserComponent} from "../popup-delete-user/popup-delete-user.component";
import {PopupCreateUserComponent} from "../popup-create-user/popup-create-user.component";
import {FictitiousUsersService} from "../../../utils/services/fictitiousDatas/fictitiousUsers/fictitious-users.service";



@Component({
    selector: 'app-page-user-list',
    templateUrl: './page-user-list.component.html',
    styleUrls: ['./page-user-list.component.scss']
})
export class PageUserListComponent implements AfterViewInit
{
    displayedColumns: string[];
    displayedColumnsUser: string[] = [ 'login', 'email', 'dateOfBirth', 'age', 'sexe', 'interests', 'createdAt', 'lastConnexion', 'actions' ];
    displayedColumnsAdvertiser: string[] = [ 'login', 'email', 'createdAt', 'lastConnexion', 'isAccepted', 'actions' ];
    displayedColumnsAdmin: string[] = [ 'login', 'email', 'createdAt', 'lastConnexion', 'actions' ];

    tabUser: any[] = [];
    tabAdvertiser: User[] = [];
    tabAdmin: User[] = [];

    roleName: string = "user" ;
    dataSource ;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;


    constructor( public themeService: ThemeService,
                 private fictitiousUsersService: FictitiousUsersService,
                 public dialog: MatDialog,
                 private snackBar: MatSnackBar ) { }


    ngAfterViewInit(): void
    {
        // --- FAUX CODE ---
        this.tabUser = this.fictitiousUsersService.getTabUser(32);
        this.tabAdvertiser = this.fictitiousUsersService.getTabAdvertiser(8);
        this.tabAdmin = this.fictitiousUsersService.getTabAdmin(4);

        for(const user of this.tabUser) user.age = this.getAge(user.dateOfBirth);

        this.displayedColumns = this.displayedColumnsUser;

        this.dataSource = new MatTableDataSource(this.tabUser);
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
                    message = user.login + " a bien été supprimée ✔" ;
                }
                this.snackBar.open( message, "", config);
            });
    }


    onCreateUser(): void
    {
        const config = { width: '50%' };
        this.dialog
            .open(PopupCreateUserComponent, config)
            .afterClosed()
            .subscribe( retour => {

                const config = { duration: 1000, panelClass: "custom-class" };
                if((retour === null) || (retour === undefined)) {
                    this.snackBar.open( "Opération annulée", "", config);
                }
                else {
                    this.snackBar.open( "L'utilisateur a bien été créé", "", config);
                }
            });
    }


    getAge(date: Date): number
    {
        const diff = Date.now() - date.getTime();
        const age = new Date(diff);
        return Math.abs(age.getUTCFullYear() - 1970);
    }
}
