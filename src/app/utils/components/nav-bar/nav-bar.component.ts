import {Component, Input, OnInit} from '@angular/core';
import {ThemeService} from "../../services/theme/theme.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent
{
  @Input() pour = "3roles";

  constructor(public themeService: ThemeService) { }

  onClick(): void {
      this.themeService.isLightTheme = !this.themeService.isLightTheme
  }

}
