import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-select-year',
  templateUrl: './select-year.component.html',
  styleUrls: ['./select-year.component.scss']
})
export class SelectYearComponent implements OnInit {

  @Output() yearChanged = new EventEmitter<number>();
  yearsList: Array<number>;

  private selectedYear: number;

  constructor() { }

  ngOnInit(): void {

    const d = new Date();
    this.selectedYear = d.getFullYear() - 1;
    this.yearsList = [];

    for (let i = this.selectedYear; i >= 2008; i--) {
      this.yearsList.push(i);
    };

    this.yearChanged.emit(this.selectedYear);

  }

  onChangeYear(target: EventTarget | null): void {

    if (target) {

      const el = target as HTMLInputElement;
      this.selectedYear = Number(el.value);

      this.yearChanged.emit(this.selectedYear);

    }

  }

}
