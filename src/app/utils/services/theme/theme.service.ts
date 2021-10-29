import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService
{
    isLightTheme = true;

    getClassTheme(): string
    {
        if(this.isLightTheme) return "lightTheme" ;
        else return "darkTheme"
    }
}
