import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DafAppPointerConfigComponent } from './daf-app-pointer-config.component';

describe('DafAppPointerConfigComponent', () => {
  let component: DafAppPointerConfigComponent;
  let fixture: ComponentFixture<DafAppPointerConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DafAppPointerConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DafAppPointerConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
