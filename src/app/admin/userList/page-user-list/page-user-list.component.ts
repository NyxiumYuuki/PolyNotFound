import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatTableDataSource} from "@angular/material/table";
import {PopupCreateUserComponent} from "../popup-create-user/popup-create-user.component";
import {ThemeService} from "../../../utils/theme/theme.service";
import {MessageService} from "../../../utils/message/message.service";
import {FormControl, FormGroup} from "@angular/forms";
import {DatePipe} from "@angular/common";



@Component({
  selector: 'app-page-user-list',
  templateUrl: './page-user-list.component.html',
  styleUrls: ['./page-user-list.component.scss']
})
export class PageUserListComponent implements AfterViewInit
{
    displayedColumns: string[];
    displayedColumnsUser: string[] = [ 'isActive', 'login', 'email', 'dateOfBirth', 'age', 'sexe', 'interests', 'createdAt', 'lastConnexion' ];
    displayedColumnsAdvertiser: string[] = [ 'isActive', 'login', 'email', 'company', 'createdAt', 'lastConnexion', 'isAccepted' ];
    displayedColumnsAdmin: string[] = [ 'isActive', 'login', 'email', 'createdAt', 'lastConnexion' ];

    tabUser: any[] = [];
    tabAdvertiser: any[] = [];
    tabAdmin: any[] = [];

    roleName: string = "user" ;
    dataSource ;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    filteredText: string = "" ;
    active: boolean = true;
    noActive: boolean = false;
    campaignOne = new FormGroup({
        start: new FormControl(null),
        end: new FormControl(null),
    });



    constructor( public themeService: ThemeService,
                 public dialog: MatDialog,
                 private snackBar: MatSnackBar,
                 private messageService: MessageService ) { }


    ngAfterViewInit(): void
    {
        this.messageService
            .get("user/findAll")
            .subscribe(ret => this.ngAfterViewInitCallback(ret), err => this.ngAfterViewInitCallback(err));
    }


    ngAfterViewInitCallback(retour: any): void
    {
        if(retour.status !== "success") {
            console.log(retour);
        }
        else {
            for(let person of retour.data)
            {
                if(person.role.name === "user") {
                    person["age"] = this.getAge(person.dateOfBirth);
                    delete person.profileImageUrl;
                    this.tabUser.push(person);
                }
                else if(person.role.name === "advertiser") this.tabAdvertiser.push(person);
                else this.tabAdmin.push(person);
            }
            this.onFilter();
        }
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
                    if(retour.role.name === "user") this.tabUser.push(retour);
                    else if(retour.role.name === "advertiser") this.tabAdvertiser.push(retour);
                    else if(retour.role.name === "admin") this.tabAdmin.push(retour);
                    this.onFilter();
                }
            });
    }


    onSliderIsActive(user: any): void
    {
        // il faut envoyer la négation de user.isActive
        this.messageService
            .put("user/update/"+user.id, { isActive: !user.isActive })
            .subscribe(
                ret => {},
                err => {
                    console.log("onSliderIsActive");
                    console.log(err);
                }
            );
    }


    onSlideIsAccepted(user: any): void
    {
        // il faut envoyer la négation de user.role.isAccepted
        const role0 = {
            name: user.role.name,
            permission: user.role.permission,
            isAccepted: !user.role.isAccepted,
        };
        this.messageService
            .put("user/update/"+user.id, {role: role0})
            .subscribe(
                ret => {},
                err => {
                    console.log("onSlideIsAccepted");
                    console.log(err);
                }
            );
    }


    getAge(date: Date): number
    {
        if((date === null) || (date === undefined)) return -1;
        else {
            const diff = Date.now() - (new Date(date)).getTime();
            const age = new Date(diff);
            return Math.abs(age.getUTCFullYear() - 1970);
        }
    }


    onFilter(): void
    {
        const startDate = this.campaignOne.get("start").value;
        const endDate = this.campaignOne.get("end").value;

        let tab1 = [];
        if(this.roleName === "user") {
            this.displayedColumns = this.displayedColumnsUser;
            tab1 = this.tabUser;
        }
        else if(this.roleName === "advertiser") {
            this.displayedColumns = this.displayedColumnsAdvertiser;
            tab1 = this.tabAdvertiser;
        }
        else if(this.roleName === "admin") {
            this.displayedColumns = this.displayedColumnsAdmin;
            tab1 = this.tabAdmin;
        }

        let tab2 = [];
        for(let user of tab1)
        {
            // filtre textuelle
            let valide: boolean = this.isTextFiltrationValid(user);;

            // filtre actif
            if(valide)
            {
                if(user.isActive && this.active) valide = true;
                else if((!user.isActive) && this.noActive) valide = true;
                else valide = false;
            }

            // filtre date
            if(valide)
            {
                if ((user.lastConnexion === null) && (startDate !== null)) valide = false;
                else if ((user.lastConnexion === null) && (endDate !== null)) valide = false;
                else if (startDate !== null)
                {
                    let timeLastConnexion = 0;
                    if(user.lastConnexion !== null) timeLastConnexion = (new Date(user.lastConnexion)).getTime();

                    if(startDate.getTime() > timeLastConnexion) valide = false;
                    else if (endDate !== null)
                    {
                        if(endDate.getTime() < timeLastConnexion) valide = false;
                    }
                }
            }

            if(valide) tab2.push(user);
        }

        this.dataSource = new MatTableDataSource(tab2);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }


    isTextFiltrationValid(user): boolean
    {
        let datePipe = new DatePipe('en-GB');
        if(user.login.includes(this.filteredText)) return true;
        if(user.email.includes(this.filteredText)) return true;
        const createdAt = datePipe.transform(new Date(user.createdAt), 'dd/MM/yyyy à HH:mm:ss');
        if(createdAt.includes(this.filteredText)) return true;
        const lastConnexion = datePipe.transform(new Date(user.lastConnexion), 'dd/MM/yyyy à HH:mm:ss');
        if(lastConnexion.includes(this.filteredText)) return true;

        if(this.roleName === 'user')
        {
            const dateOfBirth = datePipe.transform(new Date(user.dateOfBirth), 'dd/MM/yyyy à HH:mm:ss');
            if(dateOfBirth.includes(this.filteredText)) return true;
            if(user.age.toString().includes(this.filteredText)) return true;
            if((user.sexe === 'man') && (this.filteredText === 'M')) return true;
            if((user.sexe === 'woman') && (this.filteredText === 'F')) return true;
            if(user.interests.toString().includes(this.filteredText)) return true;
        }
        else if(this.roleName === 'advertiser')
        {
            if(user.company.includes(this.filteredText)) return true;
        }
        return false;
    }


    onEffacerDate(): void {
        this.campaignOne.setValue({start: null, end: null });
        this.onFilter();
    }

}
