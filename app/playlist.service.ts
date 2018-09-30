import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  API_URL  =  'http://localhost:3000'; // Node server AudioAWS host and port
  constructor(private  httpClient:  HttpClient) { }

  getStorageInfo(){
    return  this.httpClient.get(`${this.API_URL}`);
  }
}
