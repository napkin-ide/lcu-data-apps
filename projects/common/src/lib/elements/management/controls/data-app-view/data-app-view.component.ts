import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataAppDetails } from '../../../../state/data-apps-management.state';
import { DataDAFAppDetails } from '../../../../state/data-apps-management.state';

@Component({
  selector: 'lcu-data-app-view',
  templateUrl: './data-app-view.component.html',
  styleUrls: ['./data-app-view.component.scss'],
})
export class DataAppViewComponent implements OnInit {
  //  Properties
  @Input('active-daf-application')
  public ActiveDAFApplication: string;

  @Input('application')
  public Application: DataAppDetails;

  @Output('application-tab-click')
  public ApplicationTabClicked: EventEmitter<number>;

  @Output('back-click')
  public BackClicked: EventEmitter<{}>;

  @Input('current-application-tab')
  public CurrentApplicationTab: number;

  @Input('daf-applications')
  public DAFApplications: DataDAFAppDetails[];

  @Output('daf-settings-click')
  public DAFSettingsClicked: EventEmitter<DataDAFAppDetails>;

  //  Constructors
  constructor() {
    this.ApplicationTabClicked = new EventEmitter<number>();

    this.BackClicked = new EventEmitter<DataAppDetails>();

    this.DAFSettingsClicked = new EventEmitter<DataDAFAppDetails>();
  }

  //  Life Cycle
  public ngOnInit(): void {}

  //  API Methods
  public BackClick() {
    this.BackClicked.emit(this.Application);
  }

  public DAFAppSettingsClick(dafApp: DataDAFAppDetails) {
    this.DAFSettingsClicked.emit(dafApp);
  }

  public IsActiveDAFApplication(dafAppId: string) {
    return this.ActiveDAFApplication === dafAppId;
  }

  public SetApplicationTab(index: number) {
    this.ApplicationTabClicked.emit(index);
  }

  //  Helpers
}
