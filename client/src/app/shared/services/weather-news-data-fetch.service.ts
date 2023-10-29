import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, retry } from 'rxjs';
import { IWeatherData } from 'src/app/interfaces/IWeatherData';
import { ErrorValidation } from '../utili/error-validation';

@Injectable({
  providedIn: 'root'
})
export class WeatherNewsFetchService {

  private BASE_WEATHER_API = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
  private API_KEY = 'JRBL3D4VYGN4J4KKJS6MPPGBJ';

  constructor(private http: HttpClient) {}

  getAllWeatherData(country: string): Observable<IWeatherData> {
    const url = `${this.BASE_WEATHER_API}${country}?unitGroup=metric&key=${this.API_KEY}&contentType=json`;
    return this.http.get<IWeatherData>(url).pipe(
        retry(3),
        catchError(ErrorValidation.handleError)
    );
  }  
}
