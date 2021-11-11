import { Component, OnInit } from '@angular/core';
import {ThemeService} from "../../utils/services/theme/theme.service";

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss']
})
export class NavbarAdminComponent
{
    urlImage: string = "" ;

    constructor( public themeService: ThemeService ) { }

    onDeconnexion(): void {

    }
}
