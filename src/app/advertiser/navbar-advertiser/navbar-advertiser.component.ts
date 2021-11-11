import { Component } from '@angular/core';
import {ThemeService} from "../../utils/services/theme/theme.service";

@Component({
  selector: 'app-navbar-advertiser',
  templateUrl: './navbar-advertiser.component.html',
  styleUrls: ['./navbar-advertiser.component.scss']
})
export class NavbarAdvertiserComponent
{
    urlImage: string = "" ;

    constructor( public themeService: ThemeService ) { }

    onDeconnexion(): void {}

}
