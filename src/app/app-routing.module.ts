import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
import { AccidentDetailsComponent } from './events/accident-details/accident-details.component';
import { EventsComponent } from './events/events/events.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'events', component: EventsComponent },
    { path: 'event-details/:id', component: AccidentDetailsComponent },
    { path: 'search', component: AdvancedSearchComponent },
    { path: 'reporting', loadChildren: () => {
      console.log('lazy load');
      return import('./reporting/reporting.module').then(m => m.ReportingModule);
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
