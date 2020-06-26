import { Component, OnInit, Input } from '@angular/core';
import { DataAppDetails } from '../../../../state/data-apps-management.state';

@Component({
  selector: 'lcu-data-apps-list',
  templateUrl: './data-apps-list.component.html',
  styleUrls: ['./data-apps-list.component.scss']
})
export class DataAppsListComponent implements OnInit {
  //  Properties
  @Input('applications')
  public Applications: DataAppDetails[];

  //  Constructors
  constructor() { }

  //  Life Cycle
  public ngOnInit(): void {
  }

  //  API Methods

  //  Helpers
}
