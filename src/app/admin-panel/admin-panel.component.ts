import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  private sub$: Subscription;
  public secretId: string;

  ngOnInit(): void {

    this.sub$ = this.route.params.subscribe((params: Params) => {

      // Get our event ID from the URL
      this.secretId = params['secretId'];

    });

  }

}
