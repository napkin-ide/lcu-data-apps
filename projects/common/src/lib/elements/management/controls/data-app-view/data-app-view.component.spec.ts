import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAppViewComponent } from './data-app-view.component';

describe('DataAppViewComponent', () => {
  let component: DataAppViewComponent;
  let fixture: ComponentFixture<DataAppViewComponent>;

  beforeEach(async(() => {
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
