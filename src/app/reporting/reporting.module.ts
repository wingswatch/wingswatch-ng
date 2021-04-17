import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportingRoutingModule } from './reporting-routing.module';
import { AccidentsByLocationComponent } from './accidents-by-location/accidents-by-location.component';
import { AreaChartModule, BarChartModule, HeatMapModule, PieChartModule } from '@swimlane/ngx-charts';
import { AccidentsHeatMapComponent } from './accidents-heat-map/accidents-heat-map.component';
import { AccidentsByTypeComponent } from './acidents-by-type/accidents-by-type.component';
import { InjurySeverityByYearComponent } from './injury-severity-by-year/injury-severity-by-year.component';
import { EventsByStateComponent } from './events-by-state/events-by-state.component';
import { SharedModule } from '../shared.module';
import { SelectYearComponent } from './select-year/select-year.component';
import { ChartEventsByMonthComponent } from './chart-accidents-by-month/chart-events-by-month.component';

@NgModule({
  declarations: [
    AccidentsByLocationComponent,
    AccidentsHeatMapComponent,
    ChartEventsByMonthComponent,
    AccidentsByTypeComponent,
    InjurySeverityByYearComponent,
    EventsByStateComponent,
    SelectYearComponent
  ],
  imports: [
    CommonModule,
    ReportingRoutingModule,
    BarChartModule,
    PieChartModule,
    HeatMapModule,
    AreaChartModule,
    SharedModule
  ]
})
export class ReportingModule { }
