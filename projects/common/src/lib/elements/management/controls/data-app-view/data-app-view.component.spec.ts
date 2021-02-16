import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DataAppViewComponent } from './data-app-view.component';

describe('DataAppViewComponent', () => {
  let component: DataAppViewComponent;
  let fixture: ComponentFixture<DataAppViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DataAppViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAppViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
