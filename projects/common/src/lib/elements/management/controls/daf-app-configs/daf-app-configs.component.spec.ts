import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DafAppConfigsComponent } from './daf-app-configs.component';

describe('DafAppConfigsComponent', () => {
  let component: DafAppConfigsComponent;
  let fixture: ComponentFixture<DafAppConfigsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DafAppConfigsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DafAppConfigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
