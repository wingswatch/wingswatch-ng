import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { AccidentsComponent } from './events/accidents/accidents.component';
import { AccidentDetailsComponent } from './events/accident-details/accident-details.component';
import { SvgSpinnerComponent } from './svg-spinner/svg-spinner.component';
import { AccidentsHeatMapComponent } from './reporting/accidents-heat-map/accidents-heat-map.component';
import { ChartAccidentsByMonthComponent } from './reporting/chart-accidents-by-month/chart-accidents-by-month.component';
import { AccidentsByTypeComponent } from './reporting/acidents-by-type/accidents-by-type.component';
import { AccidentsByLocationComponent } from './reporting/accidents-by-location/accidents-by-location.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AreaChartModule, BarChartModule, HeatMapModule, PieChartModule } from '@swimlane/ngx-charts';
import { InjurySeverityByYearComponent } from './reporting/injury-severity-by-year/injury-severity-by-year.component';
import { EventsByStateComponent } from './reporting/events-by-state/events-by-state.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { EventDetailsAircraftComponent } from './events/accident-details/event-details-aircraft/event-details-aircraft.component';
import { AppRoutingModule } from './app-routing.module';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    AccidentsComponent,
    AccidentDetailsComponent,
    SvgSpinnerComponent,
    AccidentsHeatMapComponent,
    ChartAccidentsByMonthComponent,
    AccidentsByTypeComponent,
    AccidentsByLocationComponent,
    InjurySeverityByYearComponent,
    EventsByStateComponent,
    SearchBoxComponent,
    EventDetailsAircraftComponent,
    AdvancedSearchComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BarChartModule,
    PieChartModule,
    HeatMapModule,
    AreaChartModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
