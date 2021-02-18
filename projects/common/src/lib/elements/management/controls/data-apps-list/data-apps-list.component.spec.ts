import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DataAppsListComponent } from './data-apps-list.component';

describe('DataAppsListComponent', () => {
  let component: DataAppsListComponent;
  let fixture: ComponentFixture<DataAppsListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DataAppsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAppsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
