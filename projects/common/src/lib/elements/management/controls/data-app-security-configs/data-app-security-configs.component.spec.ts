import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAppSecurityConfigsComponent } from './data-app-security-configs.component';

describe('DataAppSecurityConfigsComponent', () => {
  let component: DataAppSecurityConfigsComponent;
  let fixture: ComponentFixture<DataAppSecurityConfigsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataAppSecurityConfigsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAppSecurityConfigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
