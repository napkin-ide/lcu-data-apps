import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DafAppViewConfigComponent } from './daf-app-view-config.component';

describe('DafAppViewConfigComponent', () => {
  let component: DafAppViewConfigComponent;
  let fixture: ComponentFixture<DafAppViewConfigComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DafAppViewConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DafAppViewConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
