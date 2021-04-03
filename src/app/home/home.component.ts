import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  body: HTMLBodyElement = document.getElementsByTagName("body")[0];

  ngOnInit() {
    this.body.setAttribute("id", "homepage");
  }

  ngOnDestroy() {
    this.body.removeAttribute("id");
  }

}
