import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Data, Root } from 'interfaces/location';
import { IGeoData, IWeather, Weather } from 'interfaces/weatherInterface';
import { environment } from 'src/environments/environment.development';
import { Location } from '@angular/common';
import { List, Rootforecast } from 'interfaces/forcast';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  locationUrl = 'https://wft-geo-db.p.rapidapi.com/v1/geo';
  weatherUrl = 'https://api.openweathermap.org/data/2.5';
// api=environment.api;
geokey=environment.geokey
weatherKey =environment.weatherKey

  constructor(private http:HttpClient) {


  }


  getcity(input:string):Observable<Data[]>{
return this.http.get<Root>(`${this.locationUrl}/cities?minPopulation=10000&namePrefix=${input}`,{
  headers:{
    'X-RapidAPI-Key': this.geokey,
 'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
  }
}).pipe(map(root=>{
  return root.data
}))
  }


  getweather(lat:any ,lon:any):Observable<IWeather>{
    return this.http.get<IWeather>(`${this.weatherUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.weatherKey}&units=metric`)
  }

  getforcast(lat:any,lon:any):Observable<List[]>{
    return this.http.get<Rootforecast>(`${this.weatherUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.weatherKey}&units=metric`).pipe(map(val=>{
  return val.list
}))
}

}
//
// 'X-RapidAPI-Key': this.key,
// 'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
//
