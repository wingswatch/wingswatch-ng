import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { AccidentDetailsComponent } from './events/accident-details/accident-details.component';
import { SvgSpinnerComponent } from './svg-spinner/svg-spinner.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchBoxComponent } from './search-box/search-box.component';
import { EventDetailsAircraftComponent } from './events/accident-details/event-details-aircraft/event-details-aircraft.component';
import { AppRoutingModule } from './app-routing.module';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
import { EventsComponent } from './events/events/events.component';

import { TableModule } from 'primeng/table';
import { SharedModule } from './shared.module';
import { ReportingModule } from './reporting/reporting.module';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    EventsComponent,
    AccidentDetailsComponent,
    SearchBoxComponent,
    EventDetailsAircraftComponent,
    AdvancedSearchComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TableModule,
    SharedModule,
    ReportingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
