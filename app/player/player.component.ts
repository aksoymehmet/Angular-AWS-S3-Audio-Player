import { Component, Input, ViewChild, ElementRef, OnChanges, SimpleChange, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { CookieService } from 'angular2-cookie/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  constructor(private _cookieService:CookieService) { }

  public audio:any;
  private songTime: string;
  private songDuration: string;
  private currentTime: number = 0;
  private duration: number = 0;
  private numberPlaylist: number = 0;
  private repeat: string = "false";
  private random: string = "false";
  private RADIUS: number = 45;
  private CIRCUMFERENCE = 2 * Math.PI * this.RADIUS;
  private bCircle: string = "assets/img/player/circle.svg";
  private bRepeat: string = "assets/img/player/picto_repeat.svg";
  private bBack: string = "assets/img/player/btn_back.svg";
  private bPlayPause: string = "assets/img/player/btn_play.svg";
  private bNext: string = "assets/img/player/btn_avancer.svg";
  private bRandom: string = "assets/img/player/picto_aleatoire.svg";
  private vMute: string = "assets/img/player/picto_vol_mute.svg";
  private vSon: string = "assets/img/player/picto_vol_son.svg";
  private vMenu: string = "assets/img/player/picto_menu_player.svg";
  private title: string;
  private cover: string = "assets/img/player/angular.png";
  

@Input() myPlaylist: any;
@ViewChild("matSlider", {read: ElementRef}) matSlider: ElementRef;

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  ngOnInit(){
    
    this.audio = new Audio();
    this.audio.muted = false; 
    this.matSlider.nativeElement.style.display = "none"; 
    let repeatI =  this._cookieService.get("repeat");
    let randomI =  this._cookieService.get("random");
    let numberPlaylistI = this._cookieService.get("numberPlaylist");
    let currentTimeI = this._cookieService.get("currentTime");
    let durationI = this._cookieService.get("duration");

    if (repeatI) {
      this.repeat = repeatI;
      if(this.repeat == "false")
      {
        setTimeout(function(){ $("#picto_repeat g").css("stroke","rgb(36, 15, 57)"); }, 30);
      }
      else
      {
        setTimeout(function(){ $("#picto_repeat g").css("stroke","#fe5266"); }, 30);
      }
    } else {
      this._cookieService.put("repeat","false");
      setTimeout(function(){ $("#picto_repeat g").css("stroke","rgb(36, 15, 57)"); }, 30);
    }

    if (randomI) {
      this.random = randomI;
      if(this.random == "false")
      {
        setTimeout(function(){ $("#picto_aleatoire g").css("fill","rgb(36, 15, 57)"); }, 30);
      }
      else
      {
        setTimeout(function(){ $("#picto_aleatoire g").css("fill","#fe5266"); }, 30);
      }
    } else {
      this._cookieService.put("random","false");
      setTimeout(function(){ $("#picto_aleatoire g").css("fill","rgb(36, 15, 57)"); }, 30);
    }

    if (numberPlaylistI) {
      this.numberPlaylist = parseInt(numberPlaylistI);
    } else {
      this.numberPlaylist = this.numberPlaylist;
    }

    if (currentTimeI) {
      this.currentTime = parseInt(currentTimeI);
      this.audio.currentTime = this.currentTime;
      this.myPlaylist[this.numberPlaylist.toString()].currentTime = this.currentTime;
      
    } else {
      this.currentTime = this.currentTime;
      this.audio.currentTime = this.currentTime;
      this.myPlaylist[this.numberPlaylist.toString()].currentTime = this.currentTime;
    }

    if (durationI) {
      this.duration = parseInt(durationI);
      this.myPlaylist[this.numberPlaylist.toString()].duration = this.duration;
    } else {
      this.duration = this.duration;
      this.myPlaylist[this.numberPlaylist.toString()].duration = this.duration;
    }

    if (!this.audio.paused)
  { 
    $("#player").css("display","block");
  }
  else
  {
    $("#player").css("display","none");
  }

    this.audio.src = this.myPlaylist[this.numberPlaylist.toString()].url;
    this.audio.onended = () => { 

      this._cookieService.put("numberPlaylist", String(parseInt(this._cookieService.get("numberPlaylist")) + 1));
      this.numberPlaylist = parseInt(this._cookieService.get("numberPlaylist"));

      if(this.repeat == "true")
      {

        if(this.numberPlaylist > this.myPlaylist.length - 1)
        {
          this._cookieService.put("numberPlaylist", "0");
          this.numberPlaylist = parseInt(this._cookieService.get("numberPlaylist"));
        }

        if(this.random == "true")
        {
            this.bPlayPause = "assets/img/player/btn_pause.svg";
            this._cookieService.put("numberPlaylist", String(this.getRandomInt(0,this.myPlaylist.length-1)));
            this.numberPlaylist = parseInt(this._cookieService.get("numberPlaylist"));
            this.audio.src = this.myPlaylist[this.numberPlaylist.toString()].url;
            this.currentTime = 0;
            this.duration = 0;
            this.audio.load();
            this.audio.play();
          
        }
        else
        {
          if(this.numberPlaylist <= this.myPlaylist.length - 1)
          {
            this.bPlayPause = "assets/img/player/btn_pause.svg";
            this.audio.src = this.myPlaylist[this.numberPlaylist.toString()].url;
            this.currentTime = 0;
            this.duration = 0;
            this.audio.load();
            this.audio.play();
          }
          else
          {
            this.bPlayPause = "assets/img/player/btn_pause.svg";
            this._cookieService.put("numberPlaylist", "0");
            this.numberPlaylist = parseInt(this._cookieService.get("numberPlaylist"));
            this.audio.src = this.myPlaylist[this.numberPlaylist.toString()].url;
            this.currentTime = 0;
            this.duration = 0;
            this.audio.load();
            this.audio.play();
          }
        }
        
          
       
      }
      else
      {
       

        if(this.random == "true")
        {
          if(this.numberPlaylist <= this.myPlaylist.length - 1)
          {
            this.bPlayPause = "assets/img/player/btn_pause.svg";
            this._cookieService.put("numberPlaylist", String(this.getRandomInt(0,this.myPlaylist.length-1)));
            this.numberPlaylist = parseInt(this._cookieService.get("numberPlaylist"));
            this.audio.src = this.myPlaylist[this.numberPlaylist.toString()].url;
            this.currentTime = 0;
            this.duration = 0;
            this.audio.load();
            this.audio.play();
          }
          else
          {
            this._cookieService.put("numberPlaylist", "0");
            this.numberPlaylist = parseInt(this._cookieService.get("numberPlaylist"));
            this.audio.src = this.myPlaylist[this.numberPlaylist.toString()].url;
            this.currentTime = 0;
            this.duration = 0;
            this.audio.load();
            this.audio.play();
            let that = this;
            setTimeout(function(){ that.audio.pause(); }, 30);
            this.bPlayPause = "assets/img/player/btn_play.svg";

          }
            
        }
        else
        {
          if(this.numberPlaylist <= this.myPlaylist.length - 1)
          {
            this.bPlayPause = "assets/img/player/btn_pause.svg";
            this.audio.src = this.myPlaylist[this.numberPlaylist.toString()].url;
            this.currentTime = 0;
            this.duration = 0;
            this.audio.load();
            this.audio.play();
          }
          else
          {
            
            this._cookieService.put("numberPlaylist", "0");
            this.numberPlaylist = parseInt(this._cookieService.get("numberPlaylist"));
            this.audio.src = this.myPlaylist[this.numberPlaylist.toString()].url;
            this.currentTime = 0;
            this.duration = 0;
            this.audio.load();
            this.audio.play();
            let that = this;
            setTimeout(function(){ that.audio.pause(); }, 30);
            this.bPlayPause = "assets/img/player/btn_play.svg";
          }
        }
        
      }

      
    } 

    

    this.audio.addEventListener("timeupdate", (audio) => {

      if(isNaN(audio.path[0].duration))
      {
        console.log("Not loaded!");
      }
      else
      {
        this.matSlider.nativeElement.style.display = "inline-block"; 

        this._cookieService.put("currentTime", String(audio.path[0].currentTime));
        this.currentTime = parseInt(this._cookieService.get("currentTime"));

        this._cookieService.put("duration", String(audio.path[0].duration));
        this.duration = parseInt(this._cookieService.get("duration"));

        let progress = ((this.currentTime * 100) / this.duration) / 100;
        let dashoffset = this.CIRCUMFERENCE * (1 - progress);

        $("#pCircle svg:last-child").css("stroke-dashoffset", String(dashoffset)); 

        let minutes = Math.floor((audio.path[0].duration - audio.path[0].currentTime) / 60);
        let seconds = "0" +  Math.floor((audio.path[0].duration - audio.path[0].currentTime) - minutes * 60);

        let minutes2 = Math.floor(audio.path[0].currentTime / 60);
        let seconds2 = "0" +  Math.floor(audio.path[0].currentTime - minutes2 * 60);

        let dur = "-" + minutes + "." + seconds.substr(-2);
        let dur2 = minutes2 + "." + seconds2.substr(-2);
        
        this.songDuration = dur;
        this.songTime = dur2;
        this.title = this.myPlaylist[this.numberPlaylist.toString()].title;
      }
    });
    
}


  onInputChange(event: any) {
    console.log(event);
    this.audio.currentTime = event.value;
  }

  myBackFunction(event) {

    if(this.audio.currentTime < 3)
    {
      this._cookieService.put("numberPlaylist", String(parseInt(this._cookieService.get("numberPlaylist")) - 1));
      this.numberPlaylist = parseInt(this._cookieService.get("numberPlaylist"));

      if(this.numberPlaylist < 0)
      {
        this._cookieService.put("numberPlaylist", "0");
        this.numberPlaylist = parseInt(this._cookieService.get("numberPlaylist"));
      }

      this.audio.src = this.myPlaylist[this.numberPlaylist.toString()].url;
      this.currentTime = 0;
      this.duration = 0;
      this.audio.load();
      this.bPlayPause = "assets/img/player/btn_pause.svg";
      this.audio.play();
    }
    else
    {
      this.audio.currentTime = 0
      this.duration = 0;
      this.audio.load();
      this.audio.play();
    }
  }

  myNextFunction(event) {

    this._cookieService.put("numberPlaylist", String(parseInt(this._cookieService.get("numberPlaylist")) + 1));
    this.numberPlaylist = parseInt(this._cookieService.get("numberPlaylist"));

    if(this.numberPlaylist >= this.myPlaylist.length)
      {
        this._cookieService.put("numberPlaylist", "0");
        this.numberPlaylist = parseInt(this._cookieService.get("numberPlaylist"));
      }

      this.audio.src = this.myPlaylist[this.numberPlaylist.toString()].url;
      this.currentTime = 0;
      this.duration = 0;
      this.audio.load();
      this.bPlayPause = "assets/img/player/btn_pause.svg";
      this.audio.play();

  }

  myPlayFunction(event) {

    console.log(this.audio.played);

    if (!this.audio.paused)
    { 
      this.audio.pause();
      this.bPlayPause = "assets/img/player/btn_play.svg";
      setTimeout(function(){ $("#player").css("display","none"); }, 30);
    }
    else
    {
      this.audio.play();
      this.bPlayPause = "assets/img/player/btn_pause.svg";
      setTimeout(function(){ $("#player").css("display","block"); }, 30);
      
    }
    
  }

  myRepeatFunction(event) {

    if (this.repeat == "true")
    { 
      this._cookieService.put("repeat","false");
      this.repeat = this._cookieService.get("repeat");
      $("#picto_repeat g").css("stroke","rgb(36, 15, 57)");
    }
    else
    {
      this._cookieService.put("repeat","true");
      this.repeat = this._cookieService.get("repeat");
      $("#picto_repeat g").css("stroke","#fe5266");
    }
    
  }

  myRandomFunction(event) {

    if (this.random == "true")
    { 
      this._cookieService.put("random","false");
      this.random = this._cookieService.get("random");
      $("#picto_aleatoire g").css("fill","rgb(36, 15, 57)");
    }
    else
    {
      this._cookieService.put("random","true");
      this.random = this._cookieService.get("random");
      $("#picto_aleatoire g").css("fill","#fe5266");
    }
    
  }

  myMuteFunction(event) {
    if (this.audio.muted == true)
    {
      this.audio.muted = false;
    }
    else
    {
      this.audio.muted = true;
    }
    
  }

  onVolumeChange(event: any) {
    console.log(event);
    this.audio.volume = event.value;

  }

}

