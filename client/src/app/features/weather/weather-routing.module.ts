import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherListComponent } from './weather-list/weather-list.component';
import { WeatherDetailComponent } from './weather-detail/weather-detail.component';
import { WeatherInfoComponent } from './weather-info/weather-info.component';


const routes: Routes = [
  { path: '',component: WeatherListComponent},
  { path: 'weather-detail/:country/:datetime', component: WeatherDetailComponent },
  { path: 'weather-info/:country', component: WeatherInfoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherRoutingModule { }
