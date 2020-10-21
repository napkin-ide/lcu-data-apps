import { Component, Input, OnInit } from '@angular/core';
import { DAFConfigService } from '../../../../core/daf-config.service';
import { DataDAFAppDetails, DataDAFAppTypes } from '../../../../state/data-apps-management.state';

@Component({
  selector: 'lcu-daf-app-card-quick-view',
  templateUrl: './daf-app-card-quick-view.component.html',
  styleUrls: ['./daf-app-card-quick-view.component.scss']
})
export class DafAppCardQuickViewComponent implements OnInit {
  //  Properties
  @Input('daf-application')
  public DAFApplication: DataDAFAppDetails;

  public get DAFConfig(): any {
    return this.dafCfgSvc.Config(this.DAFApplication);
  }

  public DataDAFAppTypes = DataDAFAppTypes;

  //  Constructors
  constructor(protected dafCfgSvc: DAFConfigService) {
  }

  //  Life Cycle
  public ngOnInit(): void {
  }

  //  API Methods

  //  Helpers
}
