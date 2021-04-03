import { Component, ViewChild, ElementRef } from '@angular/core';
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
  view: Array<number> = [700, 400];

  // options
  gradient = true;
  showLegend: boolean;
  showLabels = true;
  isDoughnut: boolean;
  legendPosition: 'right';
  accidentLocationCounts: [];
  accidentLocationCountsDisplay: [];
  toggled: boolean;
  chartType: string = this.toggled ? "Pie Chart" : "Grid"

  colorScheme = {
    domain: ['#7887AB', '#4F628E', '#2E4272', '#162955', '#061539']
  };

  constructor(private reportingProvider: ReportingProvider) {

    const d = new Date();
    this.currentYear = d.getFullYear();
    this.yearsList = [];

    // Add "All Time"
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

    year ? null : year = this.selectYear.nativeElement.value;

    this.accidentLocationCounts = null;
    this.accidentLocationCountsDisplay = null;
    this.reportingProvider.getAccidentByLocation(year).subscribe(
      // Disabling the linter for the "any" here
      // eslint-disable-next-line
      (accidents: any) => {
        this.accidentLocationCounts = accidents.map((el) => {
          return { "name": el.location, "value": el.accidentCount };
        });

        this.accidentLocationCountsDisplay = [];
        for (let i = 0; i < 10; i++) {
          this.accidentLocationCountsDisplay.push(this.accidentLocationCounts[i]);
        }

      },
      error => console.log(error)
    );

  }
}
