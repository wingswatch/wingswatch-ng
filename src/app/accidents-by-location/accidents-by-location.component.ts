import { Component, ViewChild, ElementRef } from '@angular/core';
import { EventLocationCount } from '../models/Reporting/EventLocationCount';
import { SeriesNgX } from '../models/Reporting/MultiSeriesNgX';
import { ReportingService } from '../services/reporting.service';

@Component({
  selector: 'app-accidents-by-location',
  templateUrl: './accidents-by-location.component.html',
  styleUrls: ['./accidents-by-location.component.scss']
})
export class AccidentsByLocationComponent {

  @ViewChild('selectYear') selectYear: ElementRef;

  currentYear: number;
  yearsList: Array<number>;
  view: [number, number] = [700, 400];

  // options
  gradient = true;
  showLegend: boolean;
  showLabels = true;
  isDoughnut: boolean;
  legendPosition: 'right';
  chartData: SeriesNgX[];
  eventLocationCounts: EventLocationCount[] = [];
  toggled = false;
  chartType: string = this.toggled ? 'Pie Chart' : 'Grid';

  colorScheme = {
    domain: ['#7887AB', '#4F628E', '#2E4272', '#162955', '#061539']
  };

  constructor(private reportingService: ReportingService) {

    const d = new Date();
    this.currentYear = d.getFullYear();
    this.yearsList = [];

    for (let i = this.currentYear - 1; i >= 1985; i--) {
      this.yearsList.push(i);
    }

  }

  toggleChart() {
    this.toggled = !this.toggled;
  }

  getEvents() {

    const year = this.selectYear.nativeElement.value as number;

    this.reportingService.getAccidentByLocation(year).subscribe(
      accidents => {
        this.eventLocationCounts = accidents;
        this.chartData =
          accidents.map((el) => (
            { name: el.location, value: el.eventCount }
        ));
      }
    );

  }
}
