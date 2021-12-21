import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-navbar-before-connexion',
  templateUrl: './navbar-before-connexion.component.html',
  styleUrls: ['./navbar-before-connexion.component.scss']
})
export class NavbarBeforeConnexionComponent
{
    @Input() pour = "login";
}
