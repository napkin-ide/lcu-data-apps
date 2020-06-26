import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DafAppCardComponent } from './daf-app-card.component';

describe('DafAppCardComponent', () => {
  let component: DafAppCardComponent;
  let fixture: ComponentFixture<DafAppCardComponent>;

  beforeEach(async(() => {
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
