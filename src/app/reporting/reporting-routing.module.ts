import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccidentsByLocationComponent } from './accidents-by-location/accidents-by-location.component';
import { AccidentsHeatMapComponent } from './accidents-heat-map/accidents-heat-map.component';
import { EventsByTypeComponent } from './events-by-type/events-by-type.component';
import { ChartEventsByMonthComponent } from './chart-events-by-month/chart-events-by-month.component';
import { EventsByStateComponent } from './events-by-state/events-by-state.component';
import { InjurySeverityByYearComponent } from './injury-severity-by-year/injury-severity-by-year.component';

const routes: Routes = [
  { path: '', component: AccidentsByLocationComponent },
  { path: 'events-by-location', component: AccidentsByLocationComponent },
  { path: 'heat-map/:id', component: AccidentsHeatMapComponent },
  { path: 'chart-events-by-month', component: ChartEventsByMonthComponent },
  { path: 'events-by-type', component: EventsByTypeComponent },
  { path: 'injury-severity-by-year', component: InjurySeverityByYearComponent },
  { path: 'events-by-state', component: EventsByStateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportingRoutingModule { }
