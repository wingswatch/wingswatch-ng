import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {

  items: MenuItem[] = [
    {
        label: 'Events',
        icon: 'pi pi-fw pi-list',
        routerLink: '/events'
    },
    {
      label: 'Advanced Search',
      icon: 'pi pi-fw pi-search',
      routerLink: '/search'
  },
  {
    label: 'Reports',
    items: [
      {
        label: 'Events By Month',
        routerLink: '/reporting/chart-events-by-month'
      },
      {
        label: 'Events By Type',
        routerLink: '/reporting/chart-events-by-type'
      },
      {
        label: 'Events By Location',
        routerLink: '/reporting/chart-events-by-location'
      },
      {
        label: 'Injury Severity By Year',
        routerLink: '/reporting/injury-severity-by-year'
      },
      {
        label: 'Events By State',
        routerLink: '/reporting/events-by-state'
      }
    ]},
    {
      label: 'Github',
      icon: 'pi pi-fw pi-github',
      url: 'https://github.com/wingswatch/wingswatch-ng'
    },
];

  constructor() { }

}
