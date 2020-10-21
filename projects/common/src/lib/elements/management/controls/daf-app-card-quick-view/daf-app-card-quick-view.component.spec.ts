import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DafAppCardQuickViewComponent } from './daf-app-card-quick-view.component';

describe('DafAppCardQuickViewComponent', () => {
  let component: DafAppCardQuickViewComponent;
  let fixture: ComponentFixture<DafAppCardQuickViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DafAppCardQuickViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DafAppCardQuickViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
