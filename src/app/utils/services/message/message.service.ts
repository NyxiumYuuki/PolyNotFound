import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class MessageService
{

    constructor( private http: HttpClient ) { }

    post(url: string, data: any): Observable<any>
    {
        const urlComplete = environment.debutUrl + url ;
        return this.http.post<any>(urlComplete, data, {withCredentials: true});
    }

    get(url: string): Observable<any>
    {
        const urlComplete = environment.debutUrl + url ;
        return this.http.get<any>(urlComplete,{withCredentials: true});
    }

    put(url: string, data: any): Observable<any>
    {
        const urlComplete = environment.debutUrl + url ;
        return this.http.put<any>(urlComplete, data, {withCredentials: true});
    }

    delete(url: string): Observable<any>
    {
        const urlComplete = environment.debutUrl + url ;
        return this.http.delete<any>(urlComplete,{withCredentials: true});
    }

}
