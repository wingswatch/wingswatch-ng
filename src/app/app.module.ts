/// <reference path='../../node_modules/bingmaps/types/MicrosoftMaps/Microsoft.Maps.All.d.ts' />

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { AccidentDetailsComponent } from './events/accident-details/accident-details.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EventDetailsAircraftComponent } from './events/accident-details/event-details-aircraft/event-details-aircraft.component';
import { AppRoutingModule } from './app-routing.module';
import { AdvancedSearchComponent } from './advanced-search/advanced-search.component';
import { EventsComponent } from './events/events/events.component';

import { TableModule } from 'primeng/table';
import { SharedModule } from './shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    EventsComponent,
    AccidentDetailsComponent,
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
    DropdownModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    MenubarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
