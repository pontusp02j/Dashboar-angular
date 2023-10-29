import { Component, OnInit } from '@angular/core';
import { WeatherNewsFetchService } from 'src/app/shared/services/weather-news-data-fetch.service';
import { Router } from '@angular/router';
import { IWeatherData } from 'src/app/interfaces/IWeatherData';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.scss']
})
export class WeatherInfoComponent implements OnInit {
  
  weatherData?: IWeatherData;
  displayedColumns: string[] = ['date', 'temp', 'humidity', 'windSpeed']; // Columns to display in the table

  constructor(private dataFetchService: WeatherNewsFetchService, private router: Router) { }

  ngOnInit(): void {
    const defaultCountry = 'Norway';
    this.dataFetchService.getAllWeatherData(defaultCountry).subscribe(data => {
      this.weatherData = data;
    });
  }

  getWeatherIcon(description?: string): string {
    if (description?.includes('rain')) return 'https://cdn.vectorstock.com/i/1000x1000/43/61/super-cool-rain-cloud-character-cartoon-vector-18654361.webp';
    if (description?.includes('cloud')) return 'https://png.pngtree.com/png-clipart/20221030/ourmid/pngtree-the-sad-cloud-png-image_6403540.png';
    
    return 'https://i.pinimg.com/originals/41/f3/83/41f383854da0ac8636da246e24ec5ab3.jpg';
  }

  goBack(): void {
    this.router.navigate(['../']);
  }
}
