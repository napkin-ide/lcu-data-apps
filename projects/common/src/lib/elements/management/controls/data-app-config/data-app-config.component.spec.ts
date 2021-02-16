import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DataAppConfigComponent } from './data-app-config.component';

describe('DataAppConfigComponent', () => {
  let component: DataAppConfigComponent;
  let fixture: ComponentFixture<DataAppConfigComponent>;

  beforeEach(waitForAsync(() => {
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
