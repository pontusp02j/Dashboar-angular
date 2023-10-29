import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Angular Material imports
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

// Ng2-charts
import { NgChartsModule } from 'ng2-charts';

// Ngx-bootstrap
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Ngx-drag-drop
import { DndModule } from 'ngx-drag-drop';

// NgRx Store
import { StoreModule } from '@ngrx/store';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { UserProfileCardComponent } from './features/user-profile-card/user-profile-card.component';
import { HttpClientModule } from '@angular/common/http';
import { WeatherModule } from './features/weather/weather.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UserProfileCardComponent
  ], 
  imports: [
    WeatherModule, 
    RouterModule,
    MatIconModule,
    FlexLayoutModule,
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,            
    BsDropdownModule.forRoot(), 
    DndModule,                  
    StoreModule.forRoot({}),
    BrowserAnimationsModule,
    MatSidenavModule,    
    MatButtonModule,     
    MatListModule,
    HttpClientModule         
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
