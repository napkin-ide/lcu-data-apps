import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAppStatiComponent } from './data-app-stati.component';

describe('DataAppStatiComponent', () => {
  let component: DataAppStatiComponent;
  let fixture: ComponentFixture<DataAppStatiComponent>;

  beforeEach(async(() => {
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
