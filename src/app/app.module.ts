import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { AccidentsComponent } from './accidents/accidents.component';
import { AccidentDetailsComponent } from './accident-details/accident-details.component';
import { SvgSpinnerComponent } from './svg-spinner/svg-spinner.component';
import { USMapComponent } from './usmap/usmap.component';
import { AccidentsHeatMapComponent } from './accidents-heat-map/accidents-heat-map.component';
import { ChartAccidentsByMonthComponent } from './chart-accidents-by-month/chart-accidents-by-month.component';
import { AccidentsByTypeComponent } from './acidents-by-type/accidents-by-type.component';
import { AccidentsByLocationComponent } from './accidents-by-location/accidents-by-location.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { InjurySeverityByYearComponent } from './injury-severity-by-year/injury-severity-by-year.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    AccidentsComponent,
    AccidentDetailsComponent,
    SvgSpinnerComponent,
    USMapComponent,
    AccidentsHeatMapComponent,
    ChartAccidentsByMonthComponent,
    AccidentsByTypeComponent,
    AccidentsByLocationComponent,
    InjurySeverityByYearComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'accidents', component: AccidentsComponent },
      { path: 'accident-details/:id', component: AccidentDetailsComponent },
      { path: 'us-map/:id', component: USMapComponent },
      { path: 'heat-map/:id', component: AccidentsHeatMapComponent },
      { path: 'chart-accidents-by-month', component: ChartAccidentsByMonthComponent },
      { path: 'accidents-by-type', component: AccidentsByTypeComponent },
      { path: 'accidents-by-location', component: AccidentsByLocationComponent },
      { path: 'injury-severity-by-year', component: InjurySeverityByYearComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
