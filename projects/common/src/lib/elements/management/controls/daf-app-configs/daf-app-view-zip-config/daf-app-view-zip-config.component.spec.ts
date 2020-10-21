import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DafAppViewZipConfigComponent } from './daf-app-view-zip-config.component';

describe('DafAppViewZipConfigComponent', () => {
  let component: DafAppViewZipConfigComponent;
  let fixture: ComponentFixture<DafAppViewZipConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DafAppViewZipConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DafAppViewZipConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
