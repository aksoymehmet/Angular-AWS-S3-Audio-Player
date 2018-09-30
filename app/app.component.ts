import { Component, OnInit } from '@angular/core';
import { PlaylistService } from './playlist.service';

class StorageInfo {
  Key : string;
  LastModified: string;
  ETag: string;
  Size: number;
  StorageClass: string;
}

class Playlist {
  title: string;
  currentTime: number;
  duration: number;
  url: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private  storageInfo:  Array<StorageInfo> = [];
  private  url: string;
  private  playlist:  Array<Playlist> = [];

  constructor(private playlistService: PlaylistService) { }

  ngOnInit() {
    this.getStorageInfo();
  }
  setUrl(urlC){
    return this.url = urlC;
  }
  getUrl(){
    return this.url;
  }
  getStorageInfo(){
    this.playlistService.getStorageInfo().subscribe((data: Array<StorageInfo>) => {
        this.storageInfo  =  data;

        data.forEach(value => {
          if(value.Key.indexOf(".mp3") == -1)
          this.setUrl(value.Key); 
        });
        data.forEach(value => {
          if(value.Key.indexOf(".mp3") != -1)
          {
            let splitValue = value.Key.split("/");
            let title = splitValue[1].split(".");
            
            this.playlist.push({"title": title[0], "currentTime": 0, "duration": 0, "url": this.getUrl()+value.Key})
          }
          
        });

        console.log(this.storageInfo);
    });
  }
}
