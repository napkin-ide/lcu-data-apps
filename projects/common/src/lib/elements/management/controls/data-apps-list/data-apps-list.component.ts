import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataAppDetails } from '../../../../state/data-apps-management.state';
import { DataDAFAppDetails } from './../../../../state/data-apps-management.state';

@Component({
  selector: 'lcu-data-apps-list',
  templateUrl: './data-apps-list.component.html',
  styleUrls: ['./data-apps-list.component.scss'],
})
export class DataAppsListComponent implements OnInit {
  //  Fields

  //  Properties
  @Input('applications')
  public Applications: DataAppDetails[];

  public get ApplicationPaths(): string[] {
    return this.Applications ? this.Applications.map(app => app.PathGroup) : [];
  }

  @Input('daf-app-options')
  public DAFAppOptions: { [key: string]: string };

  @Output('daf-app-saved')
  public DAFAppSaved: EventEmitter<DataDAFAppDetails>;

  public IsCreating: boolean;

  @Output('settings-click')
  public SettingsClicked: EventEmitter<DataAppDetails>;

  //  Constructors
  constructor() {
    this.DAFAppSaved = new EventEmitter<DataDAFAppDetails>();

    this.SettingsClicked = new EventEmitter<DataAppDetails>();
  }

  //  Life Cycle
  public ngOnInit(): void {}

  //  API Methods
  public AppSettingsClick(appDetails: DataAppDetails) {
    this.SettingsClicked.emit(appDetails);
  }

  public SaveDAFApp(dafApp: DataDAFAppDetails) {
    this.DAFAppSaved.emit(dafApp);
  }

  public ToggleCreatingNewApp() {
    this.IsCreating = !this.IsCreating;
  }

  //  Helpers
}
