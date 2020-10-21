import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAppConfigComponent } from './data-app-config.component';

describe('DataAppConfigComponent', () => {
  let component: DataAppConfigComponent;
  let fixture: ComponentFixture<DataAppConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataAppConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAppConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
