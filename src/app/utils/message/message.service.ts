import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessageService
{
    constructor( private http: HttpClient ) { }

    sendMessage( url, data ): Observable<any>
    {
        const urlComplete = environment.debutUrl + url ;
        return this.http.post<any>( urlComplete, data, {withCredentials: true} );
    }
}
