import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataAppDetails } from '../../../../state/data-apps-management.state';

@Component({
  selector: 'lcu-data-app-view',
  templateUrl: './data-app-view.component.html',
  styleUrls: ['./data-app-view.component.scss']
})
export class DataAppViewComponent implements OnInit {
  //  Properties
  @Input('application')
  public Application: DataAppDetails;

  @Output('back-click')
  public BackClicked: EventEmitter<{}>;

  //  Constructors
  constructor() {
    this.BackClicked = new EventEmitter<DataAppDetails>();
  }

  //  Life Cycle
  public ngOnInit(): void {}

  //  API Methods
  public BackClick() {
    this.BackClicked.emit(this.Application);
  }

  //  Helpers
}
