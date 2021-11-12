import {Component} from '@angular/core';



@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.scss']
})
export class NavbarUserComponent
{
    urlImage: string = "https://www.figurines-goodies.com/1185-thickbox_default/huey-duck-tales-disney-funko-pop.jpg" ;

    constructor() { }

    onDeconnexion(): void {}
}
