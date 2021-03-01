import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DafAppCardComponent } from './daf-app-card.component';

describe('DafAppCardComponent', () => {
  let component: DafAppCardComponent;
  let fixture: ComponentFixture<DafAppCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DafAppCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DafAppCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
