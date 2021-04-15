import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportingRoutingModule } from './reporting-routing.module';
import { AccidentsByLocationComponent } from './accidents-by-location/accidents-by-location.component';
import { AreaChartModule, BarChartModule, HeatMapModule, PieChartModule } from '@swimlane/ngx-charts';
import { AccidentsHeatMapComponent } from './accidents-heat-map/accidents-heat-map.component';
import { ChartAccidentsByMonthComponent } from './chart-accidents-by-month/chart-accidents-by-month.component';
import { AccidentsByTypeComponent } from './acidents-by-type/accidents-by-type.component';
import { InjurySeverityByYearComponent } from './injury-severity-by-year/injury-severity-by-year.component';
import { EventsByStateComponent } from './events-by-state/events-by-state.component';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [
    AccidentsByLocationComponent,
    AccidentsHeatMapComponent,
    ChartAccidentsByMonthComponent,
    AccidentsByTypeComponent,
    InjurySeverityByYearComponent,
    EventsByStateComponent
  ],
  exports: [
    AccidentsByTypeComponent
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
