import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IWeatherData } from 'src/app/interfaces/IWeatherData';
import { IWeatherDay } from 'src/app/interfaces/IWeatherDay';
import { WeatherNewsFetchService } from 'src/app/shared/services/weather-news-data-fetch.service';

@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.scss']
})
export class WeatherDetailComponent implements OnInit {

  cityWeather: IWeatherData | undefined;
  dayWeather: IWeatherDay | undefined;
  isLoading = true;

  constructor(
    private dataFetchService: WeatherNewsFetchService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const datetime = this.route.snapshot.paramMap.get('datetime');
    const country = this.route.snapshot.paramMap.get('country');

    if (country) {
        this.dataFetchService.getAllWeatherData(country).subscribe(data => {
            this.isLoading = false;
            this.cityWeather = data;
            if (datetime) {
                this.dayWeather = data.days.find(day => day.datetime === datetime);
            }
        }, error => {
            console.error('Error fetching weather data for the city:', error);
            this.isLoading = false;
            window.alert('Unable to fetch weather data for this city at the moment. Please try again later.');
        });
    }
  }

  goBack(): void {
    this.router.navigate(['../']);
  }

  navigateToWeatherInfo(): void {
    if (this.cityWeather) {
        const country = this.cityWeather.resolvedAddress;
        this.router.navigate(['/weather-info', country]);
    }
  }

}