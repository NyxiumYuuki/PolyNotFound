import {Component, OnInit} from '@angular/core';
import {ThemeService} from "../../utils/services/theme/theme.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.scss']
})
export class NavbarUserComponent implements OnInit
{
    urlImage: string = "" ;

    constructor( public themeService: ThemeService,
                 private router: Router) { }


    ngOnInit(): void
    {
        if(this.router.url.startsWith("/user")) {
            this.urlImage = "https://www.figurines-goodies.com/1185-thickbox_default/huey-duck-tales-disney-funko-pop.jpg";
        }
        else if(this.router.url.startsWith("/advertiser")) {
            this.urlImage = "https://www.figurines-goodies.com/1188-large_default/dewey-duck-tales-disney-funko-pop.jpg" ;
        }
        else if(this.router.url.startsWith("/admin")) {
            this.urlImage = "https://www.reference-gaming.com/assets/media/product/41195/figurine-pop-duck-tales-n-309-loulou.jpg?format=product-cover-large&k=1519639530" ;
        }
    }

    onDeconnexion(): void {

    }

}
