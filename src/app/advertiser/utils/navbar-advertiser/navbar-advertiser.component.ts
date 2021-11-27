import { Component } from '@angular/core';
import {Router} from "@angular/router";



@Component({
  selector: 'app-navbar-advertiser',
  templateUrl: './navbar-advertiser.component.html',
  styleUrls: ['./navbar-advertiser.component.scss']
})
export class NavbarAdvertiserComponent
{
    routes: string[] = [
        "/advertiser",                      // 0
        "/advertiser/adList",               // 1
        "/advertiser/adsPopularity",        // 2
        "/advertiser/subjectsPopularity",   // 3
        "/advertiser/myProfil"              // 4
    ];

    url = this.router.url;

    urlImage: string = "https://www.figurines-goodies.com/1188-large_default/dewey-duck-tales-disney-funko-pop.jpg" ;

    constructor(private router: Router) { }

    onDeconnexion(): void {}
}
