import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
import { AccidentDetailsComponent } from './events/accident-details/accident-details.component';
import { AccidentsComponent } from './events/accidents/accidents.component';
import { HomeComponent } from './home/home.component';
import { AccidentsByLocationComponent } from './reporting/accidents-by-location/accidents-by-location.component';
import { AccidentsHeatMapComponent } from './reporting/accidents-heat-map/accidents-heat-map.component';
import { AccidentsByTypeComponent } from './reporting/acidents-by-type/accidents-by-type.component';
import { ChartAccidentsByMonthComponent } from './reporting/chart-accidents-by-month/chart-accidents-by-month.component';
import { EventsByStateComponent } from './reporting/events-by-state/events-by-state.component';
import { InjurySeverityByYearComponent } from './reporting/injury-severity-by-year/injury-severity-by-year.component';

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'events', component: AccidentsComponent },
    { path: 'event-details/:id', component: AccidentDetailsComponent },
    { path: 'reporting/heat-map/:id', component: AccidentsHeatMapComponent },
    { path: 'reporting/chart-events-by-month', component: ChartAccidentsByMonthComponent },
    { path: 'reporting/events-by-type', component: AccidentsByTypeComponent },
    { path: 'reporting/events-by-location', component: AccidentsByLocationComponent },
    { path: 'reporting/injury-severity-by-year', component: InjurySeverityByYearComponent },
    { path: 'reporting/events-by-state', component: EventsByStateComponent },
    { path: 'search', component: AdvancedSearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
