import { Injectable } from '@angular/core';
import {
  DataDAFAppDetails,
  DataDAFAppTypes,
} from '../state/data-apps-management.state';
import {
  DAFAPIApplicationDetails,
  DAFAppPointerApplicationDetails,
  DAFLCUApplicationDetails,
  DAFRedirectApplicationDetails,
  DAFViewApplicationDetails,
} from '@lcu/common';

@Injectable({
  providedIn: 'root',
})
export class DAFConfigService {
  //  Properties

  //  Constructors
  constructor() {}

  //  API Methods
  public Config(dafApp: DataDAFAppDetails): any {
    if (!dafApp) {
      return {};
    }

    if (dafApp.DAFAppType === DataDAFAppTypes.API) {
      const cfgKeys = Object.keys(dafApp.Configs);

      const apiCfgs = cfgKeys.map((configKey) => {
        return <DAFAPIApplicationDetails>{
          APIRoot: dafApp.Configs[configKey]['APIRoot'],
          InboundPath: dafApp.Configs[configKey]['InboundPath'],
          Lookup: configKey,
          Methods: dafApp.Configs[configKey]['Methods'],
          Security: dafApp.Configs[configKey]['Security'],
        };
      });

      return apiCfgs;
    } else {
      return dafApp.Configs[''];
    }
  }

  //  Helpers
}
