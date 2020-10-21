import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NPMService } from '../../../../core/npm.service';
import { DataAppSecurityDetails } from '../../../../state/data-apps-management.state';

@Component({
  selector: 'lcu-data-app-security-configs',
  templateUrl: './data-app-security-configs.component.html',
  styleUrls: ['./data-app-security-configs.component.scss'],
})
export class DataAppSecurityConfigsComponent implements OnInit {
  //  Fields

  //  Properties
  @Input('access-right-options')
  public AccessRightOptions: string[];

  @Input('form-group')
  public FormGroup: FormGroup;

  @Input('security')
  public Security: DataAppSecurityDetails;

  //  Constructors
  constructor(protected npm: NPMService) {
    this.Security = {
      AccessRights: [],
      Licenses: []
    };
  }

  //  Life Cycle
  public ngOnDestroy(): void {
    this.FormGroup.removeControl('isPrivate');

    this.FormGroup.removeControl('accRights');

    this.FormGroup.removeControl('licenses');
  }

  public ngOnInit(): void {
    this.FormGroup.addControl(
      'isPrivate',
      new FormControl(this.Security.IsPrivate, [])
    );

    this.FormGroup.addControl(
      'accRights',
      new FormControl(this.Security.AccessRights, [])
    );

    this.FormGroup.addControl(
      'licenses',
      new FormControl(this.Security.Licenses, [])
    );
  }

  //  API Methods

  //  Helpers
}
