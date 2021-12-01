import {Component} from '@angular/core';
import {Router} from "@angular/router";



@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss']
})
export class NavbarAdminComponent
{
    routes: string[] = [
        "/admin",               // 0
        "/admin/userList",      // 1
        "/admin/adList",        // 2
        "/admin/myProfil",      // 3
    ];

    url = this.router.url;

    urlImage: string = "https://www.reference-gaming.com/assets/media/product/41195/figurine-pop-duck-tales-n-309-loulou.jpg?format=product-cover-large&k=1519639530" ;

    constructor(private router: Router) { }

    onDeconnexion(): void {}
}
