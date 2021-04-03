import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-usmap',
  templateUrl: './usmap.component.html',
  styleUrls: ['./usmap.component.scss']
})
export class USMapComponent implements OnInit, AfterViewInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {  }

  ngAfterViewInit() {
    const uStatePaths = document.createElement("script");
    uStatePaths.src = "assets/js/uStates.js";
    this.elementRef.nativeElement.appendChild(uStatePaths);

    const d3 = document.createElement("script");
    d3.src = "https://d3js.org/d3.v3.min.js";
    this.elementRef.nativeElement.appendChild(d3);

    setTimeout(() => {
      const mapDrawer = document.createElement("script");
      mapDrawer.src = "assets/js/mapDrawer.js";
      this.elementRef.nativeElement.appendChild(mapDrawer);
    }, 200)

  }

}
