import { Component, OnInit } from '@angular/core';
import { WeatherNewsFetchService } from 'src/app/shared/services/weather-news-data-fetch.service';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { IWeatherData } from 'src/app/interfaces/IWeatherData';
import { IWeatherDay } from 'src/app/interfaces/IWeatherDay';
import { EUCountries } from 'src/app/Mock_Data/EUCountries';
import { forkJoin, timer } from 'rxjs';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.scss']
})
export class WeatherListComponent implements OnInit {

  weatherData: IWeatherData[] = [];
  filteredWeatherData: { day: IWeatherDay, country: string }[] = [];
  filterText = '';
  totalWeatherData = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 15];
  pageIndex = 0;
  isLoading = true;

  constructor(private dataFetchService: WeatherNewsFetchService, private router: Router) { }

  ngOnInit(): void {
    const DELAY_BETWEEN_REQUESTS = 200;
    const MAX_REQUESTS = 50;
    const limitedCountries = EUCountries.slice(0, MAX_REQUESTS);

    const weatherObservables = limitedCountries.map((country, index) => 
        timer(index * DELAY_BETWEEN_REQUESTS).pipe(
            concatMap(() => this.dataFetchService.getAllWeatherData(country))
        )
    );

    forkJoin(weatherObservables).pipe(
    ).subscribe({
      next: (results: IWeatherData[]) => {
        this.isLoading = false;
        this.weatherData = results;
        this.totalWeatherData = this.weatherData.reduce((acc, data) => acc + data.days.length, 0);
        this.filterWeather();
      },
      error: (err) => {
        console.error('Error fetching weather data:', err);
        this.isLoading = false;
        window.alert('Unable to fetch weather data at the moment. Please contact the administrator.');
      }
    });
  }

  filterWeather(): void {
    const allDays: { day: IWeatherDay, country: string }[] = [];

    this.weatherData.forEach(data => {
      data.days.forEach(day => {
        allDays.push({ day: day, country: data.resolvedAddress });
      });
    });

    const filtered = allDays.filter(entry => 
      entry.day.datetime.includes(this.filterText) || 
      entry.country.toLowerCase().includes(this.filterText.toLowerCase())
    );

    this.filteredWeatherData = filtered.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
    this.totalWeatherData = filtered.length;
  }

  pageChanged(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.filterWeather();
  }

  navigateToDetails(dayId: number, country: string): void {
    this.router.navigate(['/weather-detail', country, dayId]);
  }
}
