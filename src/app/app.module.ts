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
import { ContactComponent } from './contact/contact.component';
import { CommentComponent } from './comment/comment.component';
import { USMapComponent } from './usmap/usmap.component';
import { AccidentsHeatMapComponent } from './accidents-heat-map/accidents-heat-map.component';
import { ReadCommentsComponent } from './read-comments/read-comments.component';
import { ChartAccidentsByMonthComponent } from './chart-accidents-by-month/chart-accidents-by-month.component';
import { AccidentsByTypeComponent } from './acidents-by-type/accidents-by-type.component';
import { AccidentsByLocationComponent } from './accidents-by-location/accidents-by-location.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { InjurySeverityByYearComponent } from './injury-severity-by-year/injury-severity-by-year.component';
import { InjuryTypesAllYearsComponent } from './injury-types-all-years/injury-types-all-years.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ReadLogsComponent } from './read-logs/read-logs.component';
import { DeleteSerializationCacheComponent } from './delete-serialization-cache/delete-serialization-cache.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    AccidentsComponent,
    AccidentDetailsComponent,
    SvgSpinnerComponent,
    ContactComponent,
    CommentComponent,
    USMapComponent,
    AccidentsHeatMapComponent,
    ReadCommentsComponent,
    ChartAccidentsByMonthComponent,
    AccidentsByTypeComponent,
    AccidentsByLocationComponent,
    InjurySeverityByYearComponent,
    InjuryTypesAllYearsComponent,
    AdminPanelComponent,
    ReadLogsComponent,
    DeleteSerializationCacheComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'accidents', component: AccidentsComponent },
      { path: 'accident-details/:id', component: AccidentDetailsComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'us-map/:id', component: USMapComponent },
      { path: 'heat-map/:id', component: AccidentsHeatMapComponent },
      { path: 'chart-accidents-by-month/:year', component: ChartAccidentsByMonthComponent },
      { path: 'accidents-by-type', component: AccidentsByTypeComponent },
      { path: 'accidents-by-location/:year', component: AccidentsByLocationComponent },
      { path: 'injury-severity-by-year/:year', component: InjurySeverityByYearComponent },
      { path: 'injury-types-all-years', component: InjuryTypesAllYearsComponent },
      { path: 'admin-panel/:secretId', component: AdminPanelComponent },
      { path: 'read-comments/:secretId', component: ReadCommentsComponent },
      { path: 'read-logs/:secretId', component: ReadLogsComponent },
      { path: 'delete-serialization-cache/:secretId', component: DeleteSerializationCacheComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
