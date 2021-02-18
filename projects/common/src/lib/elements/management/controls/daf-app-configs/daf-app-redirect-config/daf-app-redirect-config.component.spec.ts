import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DafAppRedirectConfigComponent } from './daf-app-redirect-config.component';

describe('DafAppRedirectConfigComponent', () => {
  let component: DafAppRedirectConfigComponent;
  let fixture: ComponentFixture<DafAppRedirectConfigComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DafAppRedirectConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DafAppRedirectConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
