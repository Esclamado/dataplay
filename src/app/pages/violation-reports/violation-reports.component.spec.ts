import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViolationReportsComponent } from './violation-reports.component';

describe('ViolationReportsComponent', () => {
  let component: ViolationReportsComponent;
  let fixture: ComponentFixture<ViolationReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViolationReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViolationReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
