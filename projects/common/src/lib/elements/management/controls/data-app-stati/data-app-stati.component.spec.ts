import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DataAppStatiComponent } from './data-app-stati.component';

describe('DataAppStatiComponent', () => {
  let component: DataAppStatiComponent;
  let fixture: ComponentFixture<DataAppStatiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DataAppStatiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAppStatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
