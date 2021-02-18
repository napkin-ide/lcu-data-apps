import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DataDafAppTypeComponent } from './data-daf-app-type.component';

describe('DataDafAppTypeComponent', () => {
  let component: DataDafAppTypeComponent;
  let fixture: ComponentFixture<DataDafAppTypeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DataDafAppTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataDafAppTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
