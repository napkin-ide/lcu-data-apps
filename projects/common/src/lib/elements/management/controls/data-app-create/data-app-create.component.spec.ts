import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAppCreateComponent } from './data-app-create.component';

describe('DataAppCreateComponent', () => {
  let component: DataAppCreateComponent;
  let fixture: ComponentFixture<DataAppCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataAppCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAppCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
