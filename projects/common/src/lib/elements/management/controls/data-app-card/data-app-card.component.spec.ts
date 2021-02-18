import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DataAppCardComponent } from './data-app-card.component';

describe('DataAppCardComponent', () => {
  let component: DataAppCardComponent;
  let fixture: ComponentFixture<DataAppCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DataAppCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAppCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
