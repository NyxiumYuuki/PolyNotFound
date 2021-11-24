import { Component } from '@angular/core';



@Component({
  selector: 'app-navbar-advertiser',
  templateUrl: './navbar-advertiser.component.html',
  styleUrls: ['./navbar-advertiser.component.scss']
})
export class NavbarAdvertiserComponent
{
    urlImage: string = "https://www.figurines-goodies.com/1188-large_default/dewey-duck-tales-disney-funko-pop.jpg" ;

    constructor() { }

    onDeconnexion(): void {}
}
