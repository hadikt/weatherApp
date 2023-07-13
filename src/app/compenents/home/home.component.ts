import { Component, OnInit } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { WeatherService } from 'src/app/service/weather.service';
import { Data, Root } from 'interfaces/location';
import { DatePipe } from '@angular/common';
import { IGeoData, IWeather } from 'interfaces/weatherInterface';
import { List } from 'interfaces/forcast';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
input!:string;
debounc=new Subject<string>
$place!:Observable<Data[]>
search = false;
$daily !: Observable<IWeather>
$forcast!:Observable<List[]>
locations!:Root
geodata!:Observable<IGeoData[]>
nextdays!:List[]
intervalId:any
forcasttime!:List[]
DateToday = new Date();
// $places=new Subject<Data[]>()
constructor(private datepipe:DatePipe ,private service:WeatherService){

  this.debounc.pipe(debounceTime(1000),
  distinctUntilChanged()).subscribe(val=>{
  this.location(val)
  this.input = val
  })
}
  ngOnInit(): void {
    this.intervalId=setInterval(()=>{
this.DateToday = new Date()
    },1000)
  }

  location(input:string){
this.$place=this.service.getcity(input)
console.log(this.$place);

  }

  places(data:Data | any){
this.input=data.name
this.$place= new Observable<Data[]>
this.$daily=this.service.getweather(data.latitude,data.longitude)
this.$forcast=this.service.getforcast(data.latitude,data.longitude)
console.log(this.$daily);

this.$forcast.subscribe(res=>{
  this.forcasttime=res.filter(val=>{
    return this.datepipe.transform(val.dt_txt,'MM yyy dd')==this.datepipe.transform(this.DateToday,'MM yyy dd')
  })
})

this.$forcast.subscribe(res=>{
this.nextdays=res.filter(val=>{
  let c =this.datepipe.transform(val.dt_txt,'HH')
  return c =='12'
})
})
  }

  locator(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(loc=>{
        this.places(loc.coords)
      })
    }
    else{alert('your system rejected this request')}
  }
}
