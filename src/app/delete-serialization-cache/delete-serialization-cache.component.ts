import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-serialization-cache',
  templateUrl: './delete-serialization-cache.component.html',
  styleUrls: ['./delete-serialization-cache.component.scss']
})
export class DeleteSerializationCacheComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient) { }

  private sub$: Subscription;
  private secretId: string;

  ngOnInit() {

    this.sub$ = this.route.params.subscribe((params: Params) => {

      // Get our event ID from the URL
      this.secretId = params['secretId'];

      this.deleteSerializationCache();

    });

  }

  public cacheDeleted: boolean;

  deleteSerializationCache() {
    return this.http.delete('api/Accidents/DeleteSerializeCache/' + this.secretId).subscribe(
      () => this.cacheDeleted = true,
      error => console.log(error)
    );
  }

}
