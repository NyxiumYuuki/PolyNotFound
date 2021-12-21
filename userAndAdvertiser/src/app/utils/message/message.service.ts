import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

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

    get(url: string, params:HttpParams = new HttpParams()): Observable<any>
    {
        const urlComplete = environment.debutUrl + url ;
        return this.http.get<any>(urlComplete,{ withCredentials: true, params: params });
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
