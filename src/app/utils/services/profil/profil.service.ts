import {Injectable} from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class ProfilService
{

    getId(): string
    {
        return localStorage.getItem('id');
    }

    getProfileImageUrl(): string
    {
        return localStorage.getItem('profileImageUrl');
    }

    setId(id: string): void
    {
        localStorage.setItem('id', id);
    }

    setProfileImageUrl(profileImageUrl: string): void
    {
        localStorage.setItem('profileImageUrl', profileImageUrl);
    }

}
