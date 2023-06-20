import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataServicesService } from 'src/app/data-services.service';

@Component({
  selector: 'app-web-scrapper',
  templateUrl: './web-scrapper.component.html',
  styleUrls: ['./web-scrapper.component.css']
})
export class WebScrapperComponent implements OnInit {
  reqObj = {};
  webUrl = "";
  scarppedData = null;
  isInProg = false;
  logoSrc: string;
  siteName: string;
  constructor(private http: HttpClient, private ds : DataServicesService) {
   
  }

  ngOnInit() {
    
  }

  doScrap(){
    var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    var t = this.webUrl;
    if (t.match(regex)) {
      this.isInProg = true;
    this.reqObj = {"url": this.webUrl};
    this.ds.getScrapData(this.reqObj).subscribe(res =>{
      this.scarppedData = res;
      this.siteName = this.webUrl;
      this.logoSrc = (this.scarppedData.logos && this.scarppedData.logos.length > 0) ? this.scarppedData.logos[0].url : null;
            if(this.logoSrc && !this.logoSrc.includes('https://')){
              this.logoSrc = 'https://'+ this.logoSrc;
            }
      this.isInProg = false;
    }, (err) => {
      console.log("get Error on scarpping website == ", err)
      this.isInProg = false;
    })
    } else {
      alert("Please Enter proper website url in 'https://www.abc.com' format");
    }
    
    
  }

}
