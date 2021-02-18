import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StateConfigManagerElementComponent } from './identity-config-manager-element.component';

describe('StateConfigManagerElementComponent', () => {
  let component: StateConfigManagerElementComponent;
  let fixture: ComponentFixture<StateConfigManagerElementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StateConfigManagerElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateConfigManagerElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
