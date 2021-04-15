import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccidentsByLocationComponent } from './accidents-by-location/accidents-by-location.component';
import { AccidentsHeatMapComponent } from './accidents-heat-map/accidents-heat-map.component';
import { AccidentsByTypeComponent } from './acidents-by-type/accidents-by-type.component';
import { ChartAccidentsByMonthComponent } from './chart-accidents-by-month/chart-accidents-by-month.component';
import { EventsByStateComponent } from './events-by-state/events-by-state.component';
import { InjurySeverityByYearComponent } from './injury-severity-by-year/injury-severity-by-year.component';

const routes: Routes = [
  { path: 'reporting/events-by-location', component: AccidentsByLocationComponent },
  { path: 'reporting/heat-map/:id', component: AccidentsHeatMapComponent },
  { path: 'reporting/chart-events-by-month', component: ChartAccidentsByMonthComponent },
  { path: 'reporting/events-by-type', component: AccidentsByTypeComponent },
  { path: 'reporting/injury-severity-by-year', component: InjurySeverityByYearComponent },
  { path: 'reporting/events-by-state', component: EventsByStateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportingRoutingModule { }
