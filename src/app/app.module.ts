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
import { AccidentsHeatMapComponent } from './reporting/accidents-heat-map/accidents-heat-map.component';
import { ChartAccidentsByMonthComponent } from './reporting/chart-accidents-by-month/chart-accidents-by-month.component';
import { AccidentsByTypeComponent } from './reporting/acidents-by-type/accidents-by-type.component';
import { AccidentsByLocationComponent } from './reporting/accidents-by-location/accidents-by-location.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { InjurySeverityByYearComponent } from './reporting/injury-severity-by-year/injury-severity-by-year.component';
import { EventsByStateComponent } from './reporting/events-by-state/events-by-state.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { TestComponent } from './test/test.component';

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
    InjurySeverityByYearComponent,
    EventsByStateComponent,
    SearchBoxComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'events', component: AccidentsComponent },
      { path: 'event-details/:id', component: AccidentDetailsComponent },
      { path: 'us-map/:id', component: USMapComponent },
      { path: 'reporting/heat-map/:id', component: AccidentsHeatMapComponent },
      { path: 'reporting/chart-events-by-month', component: ChartAccidentsByMonthComponent },
      { path: 'reporting/events-by-type', component: AccidentsByTypeComponent },
      { path: 'reporting/events-by-location', component: AccidentsByLocationComponent },
      { path: 'reporting/injury-severity-by-year', component: InjurySeverityByYearComponent },
      { path: 'reporting/events-by-state', component: EventsByStateComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
