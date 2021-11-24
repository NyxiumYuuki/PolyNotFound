import {Component} from '@angular/core';
import {Router} from "@angular/router";



@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.scss']
})
export class NavbarUserComponent
{
    routes: string[] = [
        "/user",                // 0
        "/user/search",         // 1
        "/user/myPlaylists",    // 2
        "/user/history",        // 3
        "/user/myProfil"        // 4
    ];

    url = this.router.url;

    urlImage: string = "https://www.figurines-goodies.com/1185-thickbox_default/huey-duck-tales-disney-funko-pop.jpg" ;

    constructor(private router: Router) { }

    onDeconnexion(): void {}
}
