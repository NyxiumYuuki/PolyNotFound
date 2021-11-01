import {Component, Input, OnInit} from '@angular/core';
import {ThemeService} from "../../services/theme/theme.service";



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit
{
    @Input() pour = "login";
    urlImage: string = "" ;

    
    constructor( public themeService: ThemeService ) { }


    ngOnInit(): void
    {
        // --- FAUX CODE ---
        switch (this.pour)
        {
            case "user":
                this.urlImage = "https://www.figurines-goodies.com/1185-thickbox_default/huey-duck-tales-disney-funko-pop.jpg" ;
                break;
            case "advertiser":
                this.urlImage = "https://www.figurines-goodies.com/1188-large_default/dewey-duck-tales-disney-funko-pop.jpg" ;
                break;
            case "admin":
                this.urlImage = "https://www.reference-gaming.com/assets/media/product/41195/figurine-pop-duck-tales-n-309-loulou.jpg" ;
                break;
        }
    }


    onClick(): void
    {
        this.themeService.isLightTheme = !this.themeService.isLightTheme;
    }


    onDeconnexion(): void
    {

    }

}
