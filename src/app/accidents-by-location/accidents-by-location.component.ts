import { Component, ViewChild, ElementRef } from '@angular/core';
import { AccidentLocationCount } from '../models/Reporting/AccidentLocationCount';
import { ISeriesNgX } from '../models/Reporting/MultiSeriesNgX';
import { ReportingProvider } from '../providers/reporting.provider';

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
  chartData: ISeriesNgX[];
  accidentLocationCounts: AccidentLocationCount[] = [];
  toggled = false;
  chartType: string = this.toggled ? 'Pie Chart' : 'Grid';

  colorScheme = {
    domain: ['#7887AB', '#4F628E', '#2E4272', '#162955', '#061539']
  };

  constructor(private reportingProvider: ReportingProvider) {

    const d = new Date();
    this.currentYear = d.getFullYear();
    this.yearsList = [];

    // Add 'All Time'
    this.yearsList.push(-1);

    for (let i = this.currentYear - 1; i >= 1985; i--) {
      this.yearsList.push(i);
    }

    this.getAccidents('-1');

  }

  toggleChart() {
    this.toggled = !this.toggled;
  }

  getAccidents(year?: string) {

    let selectedYear: string;
    if (!year) {
      selectedYear = this.selectYear.nativeElement.value;
    } else {
      selectedYear = year as string;
    }

    this.reportingProvider.getAccidentByLocation(selectedYear).subscribe(
      accidents => {
        this.accidentLocationCounts = accidents;
        this.chartData =
        accidents.map((el) => (
          { name: el.location, value: el.accidentCount }
        ));
      },
      error => console.log(error)
    );

  }
}
