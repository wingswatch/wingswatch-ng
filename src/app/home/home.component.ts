import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

constructor(private title: Title, private homeService: HomeService) {}

ngOnInit() {
  
  this.title.setTitle('WingsWatch - NTSB Event Database');

  // Ping the .Net API from the home page to ensure it stays warm prior to listing events
  this.homeService.ping().subscribe();

}

}
