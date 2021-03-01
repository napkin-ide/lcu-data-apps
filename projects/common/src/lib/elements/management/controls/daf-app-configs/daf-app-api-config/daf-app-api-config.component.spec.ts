import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DafAppApiConfigComponent } from './daf-app-api-config.component';

describe('DafAppApiConfigComponent', () => {
  let component: DafAppApiConfigComponent;
  let fixture: ComponentFixture<DafAppApiConfigComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DafAppApiConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DafAppApiConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
