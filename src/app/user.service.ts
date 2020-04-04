import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {SERVICE_URL} from './utility/constant';
import {RequestOptions, Request, Headers } from '@angular/http';
  
@Injectable()
export class UserService {
  
  constructor( private http: HttpClient) { }
  doPost(url, postData) {
    const options = {} as any; 
//this is the important step. You need to set content type as null
    return new Promise((resolve, reject) => {
      this.http.post<any>(SERVICE_URL + url, postData, options).subscribe((res: any) => {
        resolve(res);
      }, (error: any) => {
        reject(error);
      });
    });
  }
}
