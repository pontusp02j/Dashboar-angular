import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherInfoComponent } from './weather-info/weather-info.component';
import { WeatherListComponent } from './weather-list/weather-list.component';
import { WeatherDetailComponent } from './weather-detail/weather-detail.component';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    WeatherInfoComponent,
    WeatherListComponent,
    WeatherDetailComponent
  ],
  imports: [
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    CommonModule,
    WeatherRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ]
})
export class WeatherModule { } 
